const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const diagrams = [
    'rtf-architecture',
    'rtf-deployment-flow',
    'rtf-components'
];

// Ensure mmdc is installed globally
exec('npm install -g @mermaid-js/mermaid-cli', (error) => {
    if (error) {
        console.error('Error installing mermaid-cli:', error);
        return;
    }

    diagrams.forEach(diagram => {
        const inputFile = path.join(__dirname, `${diagram}.mmd`);
        const outputFile = path.join(__dirname, `${diagram}.png`);

        const command = `mmdc -i ${inputFile} -o ${outputFile} -b transparent`;

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating ${diagram}.png:`, error);
                return;
            }
            console.log(`Successfully generated ${diagram}.png`);
        });
    });
}); 