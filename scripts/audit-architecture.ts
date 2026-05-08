import { Project, SyntaxKind } from 'ts-morph';

const project = new Project({ tsConfigFilePath: './tsconfig.json' });

function auditCodebase() {
  console.log('Starting Architectural AST Audit...\n');
  const violations: string[] = [];

  // 1. Next.js Layout Constraints (Server Component Enforcement)
  const layoutFiles = project.getSourceFiles('src/app/**/layout.tsx');
  layoutFiles.forEach((file) => {
    const hasUseClient = file
      .getStatements()
      .some(
        (stmt) =>
          stmt.getKind() === SyntaxKind.ExpressionStatement &&
          stmt.getText().includes('"use client"'),
      );
    if (hasUseClient) {
      violations.push(
        `🚨 [Boundary Contagion]: ${file.getFilePath()}\n   -> Contains 'use client'. Layouts must remain Server Components.`,
      );
    }
  });

  // 2. Data Validation Enforcement (Ensuring Zod is used for external interfaces)
  const apiRouteFiles = project.getSourceFiles('src/app/api/**/*.ts');
  apiRouteFiles.forEach((file) => {
    const hasZod = file
      .getImportDeclarations()
      .some((imp) => imp.getModuleSpecifierValue() === 'zod');
    if (!hasZod) {
      violations.push(
        `⚠️ [Missing Validation]: ${file.getFilePath()}\n   -> API route does not import Zod. All incoming payloads must be validated.`,
      );
    }
  });

  // 3. Micro-Frontend State Isolation (Preventing Context Leaks)
  // Flags files that export React Context, ensuring state doesn't bleed across MFE boundaries.
  const allComponents = project.getSourceFiles(
    'src/shared/components/**/*.tsx',
  );
  allComponents.forEach((file) => {
    const exportsContext = file.getVariableDeclarations().some((decl) => {
      const initializer = decl.getInitializer();
      return (
        initializer &&
        initializer.getText().includes('createContext') &&
        decl.hasExportKeyword()
      );
    });

    if (exportsContext) {
      violations.push(
        `🚨 [MFE Context Leak]: ${file.getFilePath()}\n   -> Exports React Context directly. State/routing should be handled via event emitters or the orchestrator service, not shared React state.`,
      );
    }
  });

  return violations;
}

const issues = auditCodebase();

if (issues.length > 0) {
  console.error('❌ Architectural Violations Found:\n');
  console.error(issues.join('\n\n'));
  process.exit(1);
} else {
  console.log(
    '✅ Audit Passed: Codebase aligns with architectural constraints.',
  );
}
