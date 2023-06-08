import inquirer from 'inquirer';
import util from 'util';
import fs from 'fs';
import renderMarkdown from './RenderMarkdown.js';

const writeFile = util.promisify(fs.writeFile);

const license_map = {'Academic Free License v3.0': 'afl-3.0',
'Apache license 2.0': 'apache-2.0',
'Artistic license 2.0': 'artistic-2.0',
'Boost Software License 1.0': 'bsl-1.0',
'BSD 2-clause "Simplified" license': 'bsd-2-clause',
'BSD 3-clause "New" or "Revised" license': 'bsd-3-clause',
'BSD 3-clause Clear license': 'bsd-3-clause-clear',
'BSD Zero-Clause license': '0bsd',
'Creative Commons license family': 'cc',
'Creative Commons Zero v1.0 Universal': 'cc0-1.0',
'Creative Commons Attribution 4.0': 'cc-by-4.0',
'Creative Commons Attribution Share Alike 4.0': 'cc-by-sa-4.0',
'Do What The F*ck You Want To Public License': 'wtfpl',
'Educational Community License v2.0': 'ecl-2.0',
'Eclipse Public License 1.0': 'epl-1.0',
'Eclipse Public License 2.0': 'epl-2.0',
'European Union Public License 1.1': 'eupl-1.1',
'GNU Affero General Public License v3.0': 'agpl-3.0',
'GNU General Public License family': 'gpl',
'GNU General Public License v2.0': 'gpl-2.0',
'GNU General Public License v3.0': 'gpl-3.0',
'GNU Lesser General Public License family': 'lgpl',
'GNU Lesser General Public License v2.1': 'lgpl-2.1',
'GNU Lesser General Public License v3.0': 'lgpl-3.0',
'ISC': 'isc',
'LaTeX Project Public License v1.3c': 'lppl-1.3c',
'Microsoft Public License': 'ms-pl',
'MIT': 'mit',
'Mozilla Public License 2.0': 'mpl-2.0',
'Open Software License 3.0': 'osl-3.0',
'PostgreSQL License': 'postgresql',
'SIL Open Font License 1.1': 'ofl-1.1',
'University of Illinois/NCSA Open Source License': 'ncsa',
'The Unlicense': 'unlicense',
'zLib License': 'zlib',
};

var questions = [
    // Title
    {
        type: 'input',
        name: 'title',
        message: 'Enter the project title. (Required)',
        default: 'default-project-title',
        validate: function (input) {
            if(input.trim().length > 0) return true;
            else {
                console.log('This field is required. Please enter a valid answer.');
                return false;
            }
        }
    },
    // Description
    {
        type: 'input',
        name: 'description',
        message: 'Enter the decription of the project. (Required)',
        default: 'description',
        validate: function (input) {
            if(input.trim().length > 0) return true;
            else {
                console.log('This field is required. Please enter a valid answer.');
                return false;
            }
        }
    },
    // Installation
    {
        type: 'confirm',
        name: 'confirmInstallation',
        message: 'Do you want to add Installation section?',
        default: true
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter the installation process.',
        default: 'how-to-install',
        when: function({confirmInstallation}) {
            return confirmInstallation;
        }
    },
    // Usage
    {
        type: 'confirm',
        name: 'confirmUsage',
        message: 'Do you want to add Usage section?',
        default: true
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Describe the Usage.',
        default: 'how-to-use',
        when: function({confirmUsage}) {
            return confirmUsage;
        }
    },
    // License
    {
        type: 'checkbox',
        name: 'license',
        message: 'Select a license.',
        choices: Object.keys(license_map),
        validate: function (input) {
            if(input.length == 1) return true;
            else {
                if(input.length == 0) console.log('This field is required. Please make a selection.');
                else console.log('Multiple selection is not allowed. Please select only "one".');
                return false;
            }
        }
    },
    
    // Contribution
    {
        type: 'confirm',
        name: 'confirmContribution',
        message: 'Do you want to add Contribution section?',
        default: true
    },
    {
        type: 'input',
        name: 'contribution',
        message: 'How would other developers contribute to this project?',
        default: 'how-to-contribute',
        when: function({confirmContribution}) {
            return confirmContribution;
        }
    },
    // Test
    {
        type: 'confirm',
        name: 'confirmTest',
        message: 'Do you want to add Test section?',
        default: true
    },
    {
        type: 'input',
        name: 'test',
        message: 'How users may test this application?',
        default: 'how-to-test',
        when: function({confirmTest}) {
            return confirmTest;
        }
    },
    
    // Github username
    {
        type: 'input',
        name: 'username',
        message: 'Enter the username. (Required)',
        default: 'your-username',
        validate: function (input) {
            if(input.trim().length > 0) return true;
            else {
                console.log('This field is required. Please enter a valid answer.');
                return false;
            }
        }
    },
    // Github
    {
        type: 'input',
        name: 'email',
        message: 'Enter the email. (Required)',
        default: 'your@email.com',
        validate: function (input) {
            if(input.trim().length > 0) return true;
            else {
                console.log('This field is required. Please enter a valid answer.');
                return false;
            }
        }
    },
    // Questions
    {
        type: 'input',
        name: 'questions',
        message: 'Enter the instruction for those who want to contact you. (Required)',
        default: 'how-to-contact',
        validate: function (input) {
            if(input.trim().length > 0) return true;
            else {
                console.log('This field is required. Please enter a valid answer.');
                return false;
            }
        }
    }
];


async function init() {
    // Prompt questions and get answers
    const answer = await inquirer.prompt(questions);

    // Add license code and icon to the answers before passing the variable to the renderer
    answer.license_code = license_map[answer.license];
    answer.license_icon = answer.license_code.replace('-','--');
    
    // get markdown text from the answers
    var mdtext = renderMarkdown(answer);

    // Write into file
    writeFile('./README_output.md', mdtext);
};

init();
