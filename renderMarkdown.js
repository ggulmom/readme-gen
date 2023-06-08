// do not need license setup outside of generate markdown
function renderMarkdown(data) {
    let licenseLink = `https://choosealicense.com/licenses/${data.license_code}/`;
    let template = 
`# ${data.title}

## Description
${data.description}

![badge](https://img.shields.io/badge/license-${data.license_icon}-green)\n\n`;

    let tableOfContents = '## Table of Contents\n';

    let contents = '';

    if (data.confirmInstallation) {
        contents += `
## Installation

${data.installation}\n`;

        tableOfContents += "* [Installation](#installation)\n";
    }
    
    if (data.confirmUsage) {
        contents += `
## Usage

${data.usage}\n`;
        tableOfContents += "* [Usage](#usage)\n";
    }

    if (data.confirmContribution) {
        contents += `
## Contribution

${data.contribution}\n`;

        tableOfContents += "* [Contribution](#contribution)\n";
    }

    if (data.confirmTest) {
        contents += `
## Test

${data.test}\n`;

        tableOfContents += "* [Test](#test)\n";
    }
    
    tableOfContents += "* [Questions](#questions)\n* [License](#license)";

    contents += `
## Questions

${data.questions}

Contact Info:

GitHub: [${data.username}](https://github.com/${data.username})

Email: [${data.email}](maileto:${data.email})

## License

Distrubted under the ${data.license}. See [${data.license}](${licenseLink}) for more infomration.
\n`;

    template += tableOfContents + '\n';
    template += contents;

    return template;
}

export default renderMarkdown;