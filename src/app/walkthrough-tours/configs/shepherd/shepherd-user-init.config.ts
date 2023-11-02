import { UserInitializationWalkthroughTourStepsEnum } from '../../enums/walkthrough-tour-user-initialization-steps-id.enum';

export const userInitializationTour_defaultStepOptions = {
    classes: 'walkthrough-tour-user-initialization',
    scrollTo: false,
    cancelIcon: {
        enabled: true
    },
    useModalOverlay: true,
    canClickTarget: false,
    tourName: 'UserInitialization',
    beforeShowPromise: function () {
        return new Promise<void>(function (resolve) {
            setTimeout(function () {
                resolve();
            }, 150);
        });
    }

};


// Shepherd styles for desktop view

export const userInitializationShepherdStep_desktop: any = [
    {
        id: UserInitializationWalkthroughTourStepsEnum.Welcome,
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
        scrollTo: false,
        title: 'Welcome to Adfluens!',
        text: ['To get the most out of our platform, would you like a guided walkthrough of our key features?'],
    },
    // select use case group
    {
        id: UserInitializationWalkthroughTourStepsEnum.SelectTaskGroup,
        modalOverlayOpeningPadding: 10,
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
        scrollTo: false,
        title: `Task Exploration`,
        text: [`Task Groups are containers of specific tasks.`],
    },
    // select use case
    {
        id: UserInitializationWalkthroughTourStepsEnum.SelectSpecificTask,
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
        scrollTo: false,
        title: `Task Exploration`,
        text: ['After selecting a group, you can choose between individual tasks, each designed for distinct activities.'],
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 500);
            });
        }
    },

    // set params in wizard form
    {
        id: UserInitializationWalkthroughTourStepsEnum.FillWizardFormFields,
        modalOverlayOpeningPadding: 5,
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
        scrollTo: false,
        title: `Tailor Your Request`,
        text: [`Use the form fields to customize and refine the Assistant's response, ensuring personalization and precision.`],
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 500);
            });
        }
    },

    // select GPT algo
    //     {
    //         id: UserInitializationWalkthroughTourStepsEnum.SelectGtpVersion,
    //         attachTo: {
    //             element: '.gpt-version-selector',
    //             on: 'right'
    //         },
    //         buttons: [
    //             {
    //                 classes: 'shepherd-button-secondary',
    //                 text: 'Prev',
    //                 type: 'back'
    //             },
    //             {
    //                 classes: 'shepherd-button-primary',
    //                 text: 'Next',
    //                 type: 'next'
    //             }
    //         ],
    //         cancelIcon: {
    //             enabled: true
    //         },
    //         // highlightClass: 'highlight',
    //         scrollTo: false,
    //         title: `Choose Your Engine`,
    //         text: [`To best match your needs, Adfluens lets you choose between two distinct engines:
    // <ul>
    // <li><strong>GPT 3.5:</strong> Suitable for a wide range of tasks. It's designed for those who want tested and steady results.</li>

    // <li><strong>GPT 4:</strong> The newer generation. Ideal for complex tasks and when you're seeking that extra edge in precision.</li>
    // </ul>`],
    //         // when: {
    //         //     show: () => {
    //         //         console.log('show step');
    //         //     },
    //         //     hide: () => {
    //         //         console.log('hide step');
    //         //     }
    //         // },
    //         beforeShowPromise: function () {
    //             return new Promise<void>(function (resolve) {
    //                 setTimeout(function () {
    //                     resolve();
    //                 }, 300);
    //             });
    //         }
    //     },

    //     // imagination level selector
    //     {
    //         id: UserInitializationWalkthroughTourStepsEnum.SelectImagination,
    //         attachTo: {
    //             element: '.imagination-selector',
    //             on: 'right'
    //         },
    //         buttons: [
    //             {
    //                 classes: 'shepherd-button-secondary',
    //                 text: 'Prev',
    //                 type: 'back'
    //             },
    //             {
    //                 classes: 'shepherd-button-primary',
    //                 text: 'Next',
    //                 type: 'next'
    //             }
    //         ],
    //         cancelIcon: {
    //             enabled: true
    //         },
    //         // highlightClass: 'highlight',
    //         scrollTo: false,
    //         title: `Imagination Level`,
    //         text: [`
    // <p>Adjust the imagination level of Adfluens to fine-tune the nature of its assistance:</p>

    // <ul>
    //     <li><strong>Zen Master (Optimal Imagination)</strong>: This level offers the most balanced output, ensuring optimal creativity without overstepping boundaries.</li>
    //     <li><strong>Gentle Nudge (Low Imagination)</strong>: For tasks that require direct and factual answers, keeping creativity to a minimum.</li>
    //     <li><strong>Inspired Flow (Balanced)</strong>: A harmonious blend of imaginative and factual responses, suitable for a wide range of tasks.</li>
    //     <li><strong>Vivid Imagination (High Imagination)</strong>: Engage the assistant's fullest creative potential. Ideal when seeking inventive solutions or fresh perspectives.</li>
    // </ul>`],
    //         // when: {
    //         //     show: () => {
    //         //         console.log('show step');
    //         //     },
    //         //     hide: () => {
    //         //         console.log('hide step');
    //         //     }
    //         // },
    //         beforeShowPromise: function () {
    //             return new Promise<void>(function (resolve) {
    //                 setTimeout(function () {
    //                     resolve();
    //                 }, 300);
    //             });
    //         }
    //     },

    // unleash btn
    {
        id: UserInitializationWalkthroughTourStepsEnum.UnleashAssistant,
        classes: 'm-t--15',
        canClickTarget: true,
        attachTo: {
            element: '.wizard-generate-btn-container',
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
        scrollTo: false,
        title: `Unleash the Assistant`,
        text: [`<p>After providing your details in the form fields, hit the 'Unleash' button to generate a tailored response.</p>
        
        <p><span class="f-w-500">Hit it Now</span> to Unleash your first creation!</p>
        `],
    },

    // Output Results
    {
        id: UserInitializationWalkthroughTourStepsEnum.RenderAssistantResults,
        modalOverlayOpeningPadding: 10,
        classes: 'm-l--16',
        attachTo: {
            element: '#document-editor > p',
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
        scrollTo: false,
        title: `Managing the Assistant Output`,
        text: [`
Here's what the Assistant has crafted for you. Navigate the document and make any tweaks as you see fit. All modifications are auto-saved for your convenience.`],

        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 100);
            });
        }
    },

    // Documents area
    {
        id: UserInitializationWalkthroughTourStepsEnum.DocumentsArea,
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
        scrollTo: false,
        title: `Organize With Ease`,
        text: [`
Effortlessly Create, Edit, and Delete your folders and documents, ensuring your creative assets are neatly organized.`],
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // Final Message
    {
        id: UserInitializationWalkthroughTourStepsEnum.FinalMessage,

        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary  shepherd-button-gotit',
                text: 'Got It',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        scrollTo: false,
        title: `Amplify Your Potential`,
        text: [`
Our Assistant is designed to complement and elevate your creative prowess. We're thrilled to be a part of your journey. Welcome aboard, and let's create brilliance together!`],
    },
]

















// Shepherd styles for mobile view
export const userInitializationShepherdStep_mobile: any = [
    {
        id: UserInitializationWalkthroughTourStepsEnum.Welcome,
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
        scrollTo: false,
        title: 'Welcome to Adfluens!',
        text: ['To get the most out of our platform, would you like a guided walkthrough of our key features?'],
    },
    // select use case group
    {
        id: UserInitializationWalkthroughTourStepsEnum.SelectTaskGroup,
        modalOverlayOpeningPadding: 10,
        classes: 'm-t-16',
        attachTo: {
            element: '.use-cases-container',
            on: 'bottom'
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
        scrollTo: false,
        title: `Task Exploration`,
        text: [`Task Groups are containers of specific tasks.`],
    },
    // select use case
    {
        id: UserInitializationWalkthroughTourStepsEnum.SelectSpecificTask,
        classes: 'm-t-6',
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
        scrollTo: false,
        title: `Task Exploration`,
        text: ['After selecting a group, you can choose between individual tasks, each designed for distinct activities.'],
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
        id: UserInitializationWalkthroughTourStepsEnum.FillWizardFormFields,
        modalOverlayOpeningPadding: 5,
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
        scrollTo: false,
        title: `Tailor Your Request`,
        text: [`Use the form fields to customize and refine the Assistant's response, ensuring personalization and precision.`],
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 500);
            });
        }
    },

    // select GPT algo
    //     {
    //         id: UserInitializationWalkthroughTourStepsEnum.SelectGtpVersion,
    //         attachTo: {
    //             element: '.gpt-version-selector',
    //             on: 'right'
    //         },
    //         buttons: [
    //             {
    //                 classes: 'shepherd-button-secondary',
    //                 text: 'Prev',
    //                 type: 'back'
    //             },
    //             {
    //                 classes: 'shepherd-button-primary',
    //                 text: 'Next',
    //                 type: 'next'
    //             }
    //         ],
    //         cancelIcon: {
    //             enabled: true
    //         },
    //         // highlightClass: 'highlight',
    //         scrollTo: false,
    //         title: `Choose Your Engine`,
    //         text: [`To best match your needs, Adfluens lets you choose between two distinct engines:
    // <ul>
    // <li><strong>GPT 3.5:</strong> Suitable for a wide range of tasks. It's designed for those who want tested and steady results.</li>

    // <li><strong>GPT 4:</strong> The newer generation. Ideal for complex tasks and when you're seeking that extra edge in precision.</li>
    // </ul>`],
    //         // when: {
    //         //     show: () => {
    //         //         console.log('show step');
    //         //     },
    //         //     hide: () => {
    //         //         console.log('hide step');
    //         //     }
    //         // },
    //         beforeShowPromise: function () {
    //             return new Promise<void>(function (resolve) {
    //                 setTimeout(function () {
    //                     resolve();
    //                 }, 300);
    //             });
    //         }
    //     },

    //     // imagination level selector
    //     {
    //         id: UserInitializationWalkthroughTourStepsEnum.SelectImagination,
    //         attachTo: {
    //             element: '.imagination-selector',
    //             on: 'right'
    //         },
    //         buttons: [
    //             {
    //                 classes: 'shepherd-button-secondary',
    //                 text: 'Prev',
    //                 type: 'back'
    //             },
    //             {
    //                 classes: 'shepherd-button-primary',
    //                 text: 'Next',
    //                 type: 'next'
    //             }
    //         ],
    //         cancelIcon: {
    //             enabled: true
    //         },
    //         // highlightClass: 'highlight',
    //         scrollTo: false,
    //         title: `Imagination Level`,
    //         text: [`
    // <p>Adjust the imagination level of Adfluens to fine-tune the nature of its assistance:</p>

    // <ul>
    //     <li><strong>Zen Master (Optimal Imagination)</strong>: This level offers the most balanced output, ensuring optimal creativity without overstepping boundaries.</li>
    //     <li><strong>Gentle Nudge (Low Imagination)</strong>: For tasks that require direct and factual answers, keeping creativity to a minimum.</li>
    //     <li><strong>Inspired Flow (Balanced)</strong>: A harmonious blend of imaginative and factual responses, suitable for a wide range of tasks.</li>
    //     <li><strong>Vivid Imagination (High Imagination)</strong>: Engage the assistant's fullest creative potential. Ideal when seeking inventive solutions or fresh perspectives.</li>
    // </ul>`],
    //         // when: {
    //         //     show: () => {
    //         //         console.log('show step');
    //         //     },
    //         //     hide: () => {
    //         //         console.log('hide step');
    //         //     }
    //         // },
    //         beforeShowPromise: function () {
    //             return new Promise<void>(function (resolve) {
    //                 setTimeout(function () {
    //                     resolve();
    //                 }, 300);
    //             });
    //         }
    //     },



    // unleash btn
    {
        id: UserInitializationWalkthroughTourStepsEnum.UnleashAssistant,
        classes: 'm-t--15',
        canClickTarget: true,
        attachTo: {
            element: '.wizard-generate-btn-container',
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
        scrollTo: false,
        title: `Unleash the Assistant`,
        text: [`<p>After providing your details in the form fields, hit the 'Unleash' button to generate a tailored response.</p>
        
        <p><span class="f-w-500">Hit it Now</span> to Unleash your first creation!</p>
        `],
    },

    // Output Results
    {
        id: UserInitializationWalkthroughTourStepsEnum.RenderAssistantResults,
        modalOverlayOpeningPadding: 10,
        classes: 'm-t-12',
        attachTo: {
            element: '#document-editor > p',
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
        scrollTo: false,
        title: `Managing the Assistant Output`,
        text: [`
Here's what the Assistant has crafted for you. Navigate the document and make any tweaks as you see fit. All modifications are auto-saved for your convenience.`],

        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 100);
            });
        },
        useModalOverlay: false,
    },

    // Documents area
    {
        id: UserInitializationWalkthroughTourStepsEnum.DocumentsArea,
        attachTo: {
            element: '.doc-home-outer-container',
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
        scrollTo: false,
        title: `Organize With Ease`,
        text: [`
Effortlessly Create, Edit, and Delete your folders and documents, ensuring your creative assets are neatly organized.`],
        beforeShowPromise: function () {
            return new Promise<void>(function (resolve) {
                setTimeout(function () {
                    resolve();
                }, 300);
            });
        }
    },

    // Final Message
    {
        id: UserInitializationWalkthroughTourStepsEnum.FinalMessage,

        buttons: [
            {
                classes: 'shepherd-button-secondary',
                text: 'Prev',
                type: 'back'
            },
            {
                classes: 'shepherd-button-primary shepherd-button-gotit',
                text: 'Got It',
                type: 'next'
            }
        ],
        cancelIcon: {
            enabled: true
        },
        scrollTo: false,
        title: `Amplify Your Potential`,
        text: [`
Our Assistant is designed to complement and elevate your creative prowess. We're thrilled to be a part of your journey. Welcome aboard, and let's create brilliance together!`],
    },
]

