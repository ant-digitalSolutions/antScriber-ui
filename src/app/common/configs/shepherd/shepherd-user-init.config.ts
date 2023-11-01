import { StepperOptions } from '@angular/cdk/stepper';

export const defaultStepOptions = {
    classes: 'ui-intro-box',
    scrollTo: false,
    cancelIcon: {
        enabled: true
    },
    useModalOverlay: true,
    canClickTarget: false,
    modalOverlayOpeningPadding: 10,
    
    
};

export const userInitializationShepherdStep_desktop: any = [
    {
        id: 'user-init-first-time-welcome',
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'No',
                type: 'cancel'
            },

            {
                classes: 'shepherd-button-primary',
                text: 'Yes',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: 'Welcome to Adfluens!',
        text: ['Adfluens is your AI-powered creative assistant designed to enhance productivity. To get the most out of our platform, would you like a guided walkthrough of our key features?'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // }
    },
    // select use case group
    {
        id: 'select-task-group',
        attachTo: {
            element: '.use-cases-container',
            on: 'right'
        },
        buttons: [
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Choose Your Task Group`,
        text: ['Adfluens is equipped with a variety of task groups tailored to your needs. Select a group to explore specific tasks that Adfluens can assist you with..'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // }
    },
    // select use case
    {
        id: 'select-task',
        attachTo: {
            element: '.mat-expanded',
            on: 'right'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Choose Your Desired Task`,
        text: ['Select a specific task you need assistant with.'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // set params in wizard form
    {
        id: 'wizard-form-fields',
        attachTo: {
            element: '#formElements',
            on: 'right'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Tailor Your Request`,
        text: ['For Adfluens to generate the most relevant and accurate responses, provide specific details related to your chosen task.'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
    beforeShowPromise: function () {
        return new Promise<void>(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 300);
        });
    }
    },

    // select GPT algo
    {
        id: 'select-gtp-version',
        attachTo: {
            element: '.gpt-version-selector',
            on: 'right'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Choose Your Engine`,
        text: [`To best match your needs, Adfluens lets you choose between two distinct engines:
<ul>
<li><strong>GPT 3.5:</strong> Suitable for a wide range of tasks. It's designed for those who want tested and steady results.</li>

<li><strong>GPT 4:</strong> The newer generation. Ideal for complex tasks and when you're seeking that extra edge in precision.</li>
</ul>`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // imagination level selector
    {
        id: 'select-imagination-level',
        attachTo: {
            element: '.imagination-selector',
            on: 'right'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Imagination Level`,
        text: [`
<p>Adjust the imagination level of Adfluens to fine-tune the nature of its assistance:</p>

<ul>
    <li><strong>Zen Master (Optimal Imagination)</strong>: This level offers the most balanced output, ensuring optimal creativity without overstepping boundaries.</li>
    <li><strong>Gentle Nudge (Low Imagination)</strong>: For tasks that require direct and factual answers, keeping creativity to a minimum.</li>
    <li><strong>Inspired Flow (Balanced)</strong>: A harmonious blend of imaginative and factual responses, suitable for a wide range of tasks.</li>
    <li><strong>Vivid Imagination (High Imagination)</strong>: Engage the assistant's fullest creative potential. Ideal when seeking inventive solutions or fresh perspectives.</li>
</ul>`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // unleash btn
    {
        id: 'unleash-assistant',
        attachTo: {
            element: '.wizard-generate-btn-container',
            on: 'right'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Generate Responses`,
        text: [`
Once you've adjusted the needed parameters for your task, unleash the assistant's creative answers`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // Documents area
    {
        id: 'documents-area',
        attachTo: {
            element: '.doc-home-outer-container',
            on: 'left'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Organize Your Content`,
        text: [`
Organize your content seamlessly with our intuitive File System. Create, edit, and manage all in one place`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },
]

export const userInitializationShepherdStep_mobile: any = [
    {
        id: 'user-init-first-time-welcome',
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'No',
                type: 'cancel'
            },

            {
                classes: 'shepherd-button-primary',
                text: 'Yes',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: 'Welcome to Adfluens!',
        text: ['Adfluens is your AI-powered creative assistant designed to enhance productivity. To get the most out of our platform, would you like a guided walkthrough of our key features?'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // }
    },
    // select use case group
    {
        id: 'select-task-group',
        attachTo: {
            element: '.use-cases-container',
            on: 'top'
        },
        // buttons: [
        //     {
        //         classes: 'shepherd-button-secondary',
        //         text: 'Prev',
        //         type: 'back'
        //     },
        //     {
        //         classes: 'shepherd-button-primary',
        //         text: 'Next',
        //         type: 'next'
        //     }
        // ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Choose Your Task Group`,
        text: ['Adfluens is equipped with a variety of task groups tailored to your needs. Select a group to explore specific tasks that Adfluens can assist you with..'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // }
    },
    // select use case
    {
        id: 'select-task',
        attachTo: {
            element: '.mat-expanded',
            on: 'bottom'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Choose Your Desired Task`,
        text: ['Select a specific task you need assistant with.'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // set params in wizard form
    {
        id: 'wizard-form-fields',
        attachTo: {
            element: '#formElements',
            on: 'top'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Tailor Your Request`,
        text: ['For Adfluens to generate the most relevant and accurate responses, provide specific details related to your chosen task.'],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // select GPT algo
    {
        id: 'select-gtp-version',
        attachTo: {
            element: '.gpt-version-selector',
            on: 'top'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Choose Your Engine`,
        text: [`To best match your needs, Adfluens lets you choose between two distinct engines:
<ul>
<li><strong>GPT 3.5:</strong> Suitable for a wide range of tasks. It's designed for those who want tested and steady results.</li>

<li><strong>GPT 4:</strong> The newer generation. Ideal for complex tasks and when you're seeking that extra edge in precision.</li>
</ul>`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // imagination level selector
    {
        id: 'select-imagination-level',
        attachTo: {
            element: '.imagination-selector',
            on: 'top'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Imagination Level`,
        text: [`
<p>Adjust the imagination level of Adfluens to fine-tune the nature of its assistance:</p>

<ul>
    <li><strong>Zen Master (Optimal Imagination)</strong>: This level offers the most balanced output, ensuring optimal creativity without overstepping boundaries.</li>
    <li><strong>Gentle Nudge (Low Imagination)</strong>: For tasks that require direct and factual answers, keeping creativity to a minimum.</li>
    <li><strong>Inspired Flow (Balanced)</strong>: A harmonious blend of imaginative and factual responses, suitable for a wide range of tasks.</li>
    <li><strong>Vivid Imagination (High Imagination)</strong>: Engage the assistant's fullest creative potential. Ideal when seeking inventive solutions or fresh perspectives.</li>
</ul>`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // unleash btn
    {
        id: 'unleash-assistant',
        attachTo: {
            element: '.wizard-generate-btn-container',
            on: 'top'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Generate Responses`,
        text: [`
Once you've adjusted the needed parameters for your task, unleash the assistant's creative answers`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // Documents area
    {
        id: 'documents-area',
        attachTo: {
            element: '.doc-home-outer-container',
            on: 'left'
        },
        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary',
                text: 'Next',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        classes: 'ui-intro-box',
        // highlightClass: 'highlight',
        scrollTo: false,
        title: `Organize Your Content`,
        text: [`
Organize your content seamlessly with our intuitive File System. Create, edit, and manage all in one place`],
        // when: {
        //     show: () => {
        //         console.log('show step');
        //     },
        //     hide: () => {
        //         console.log('hide step');
        //     }
        // },
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },
]