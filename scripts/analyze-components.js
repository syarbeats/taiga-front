const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Configuration
const APP_DIR = path.join(__dirname, '../app');
const OUTPUT_FILE = path.join(__dirname, '../component-analysis.json');

// Component patterns to search for
const PATTERNS = {
    component: /\.component\s*\(\s*['"]([^'"]+)['"]/g,
    directive: /\.directive\s*\(\s*['"]([^'"]+)['"]/g,
    controller: /\.controller\s*\(\s*['"]([^'"]+)['"]/g,
    service: /\.service\s*\(\s*['"]([^'"]+)['"]/g,
    factory: /\.factory\s*\(\s*['"]([^'"]+)['"]/g
};

// Store for component analysis
const analysis = {
    components: [],
    directives: [],
    controllers: [],
    services: [],
    factories: [],
    dependencies: new Map(),
    templateStats: {
        total: 0,
        withTranslations: 0,
        withForms: 0,
        withDirectives: 0
    }
};

// Helper to extract dependencies from a file
function extractDependencies(content) {
    const deps = new Set();
    const injectionPattern = /\[\s*([^\]]+)\s*\]\s*$/m;
    const matches = content.match(injectionPattern);
    
    if (matches && matches[1]) {
        matches[1].split(',')
            .map(dep => dep.trim().replace(/['"]/g, ''))
            .filter(dep => dep && dep !== 'function')
            .forEach(dep => deps.add(dep));
    }
    
    return Array.from(deps);
}

// Analyze a single file
function analyzeFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const relativePath = path.relative(APP_DIR, filePath);
    
    // Extract components and their metadata
    Object.entries(PATTERNS).forEach(([type, pattern]) => {
        let match;
        while ((match = pattern.exec(content)) !== null) {
            const name = match[1];
            const deps = extractDependencies(content);
            
            analysis[type + 's'].push({
                name,
                path: relativePath,
                dependencies: deps,
                loc: content.split('\n').length,
                hasTemplateUrl: content.includes('templateUrl'),
                hasTemplate: content.includes('template:'),
                hasTranslations: content.includes('translate'),
                hasForms: content.includes('ng-model') || content.includes('form'),
                hasDirectives: (content.match(/ng-[a-zA-Z]/g) || []).length
            });
            
            // Store dependencies
            analysis.dependencies.set(name, deps);
        }
    });
    
    // Analyze template usage
    if (content.includes('templateUrl') || content.includes('template:')) {
        analysis.templateStats.total++;
        if (content.includes('translate')) analysis.templateStats.withTranslations++;
        if (content.includes('ng-model') || content.includes('form')) analysis.templateStats.withForms++;
        if (content.match(/ng-[a-zA-Z]/g)) analysis.templateStats.withDirectives++;
    }
}

// Main analysis function
function analyzeComponents() {
    // Find all JavaScript/TypeScript files
    const files = glob.sync('**/*.{js,ts}', { cwd: APP_DIR });
    
    // Analyze each file
    files.forEach(file => {
        try {
            analyzeFile(path.join(APP_DIR, file));
        } catch (error) {
            console.error(`Error analyzing ${file}:`, error);
        }
    });
    
    // Convert dependencies Map to object for JSON serialization
    const serializedAnalysis = {
        ...analysis,
        dependencies: Object.fromEntries(analysis.dependencies)
    };
    
    // Generate summary
    const summary = {
        totalComponents: analysis.components.length,
        totalDirectives: analysis.directives.length,
        totalControllers: analysis.controllers.length,
        totalServices: analysis.services.length,
        totalFactories: analysis.factories.length,
        templateStats: analysis.templateStats,
        complexityMetrics: {
            highComplexity: analysis.components.filter(c => c.loc > 300).length,
            mediumComplexity: analysis.components.filter(c => c.loc > 100 && c.loc <= 300).length,
            lowComplexity: analysis.components.filter(c => c.loc <= 100).length
        }
    };
    
    // Save analysis results
    fs.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify({ summary, ...serializedAnalysis }, null, 2)
    );
    
    // Print summary to console
    console.log('\nComponent Analysis Summary:');
    console.log('==========================');
    console.log(JSON.stringify(summary, null, 2));
    
    // Generate migration complexity report
    console.log('\nMigration Complexity Analysis:');
    console.log('============================');
    console.log('High Complexity Components:', summary.complexityMetrics.highComplexity);
    console.log('Medium Complexity Components:', summary.complexityMetrics.mediumComplexity);
    console.log('Low Complexity Components:', summary.complexityMetrics.lowComplexity);
    
    // Suggest migration order
    const migrationOrder = [
        ...analysis.components
            .sort((a, b) => {
                // Sort by complexity and dependencies
                const aDeps = analysis.dependencies.get(a.name)?.length || 0;
                const bDeps = analysis.dependencies.get(b.name)?.length || 0;
                return (a.loc + aDeps * 10) - (b.loc + bDeps * 10);
            })
            .map(c => c.name)
    ];
    
    console.log('\nSuggested Migration Order:');
    console.log('========================');
    migrationOrder.forEach((component, index) => {
        console.log(`${index + 1}. ${component}`);
    });
}

// Run the analysis
console.log('Starting component analysis...');
analyzeComponents();
console.log('\nAnalysis complete! Results saved to:', OUTPUT_FILE);