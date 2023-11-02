import { Injectable } from "@angular/core";
import { WizardFormService } from "../services/wizard-form.service";
import { UseCaseMetaAbstract } from "./use-case-meta.abastract";
import { IUseCaseMeta } from "./use-case-meta.interface";
import { useCaseIndex } from "./use-case-register";

@Injectable({
    providedIn: 'root'
})
export class UseCaseHandle {

    _useCaseByGroup = new Map<string, UseCaseMetaAbstract[]>();

    /**
     *
     */
    constructor() {
        this.initUseCaseMetaData();
    }


    initUseCaseMetaData() {
        useCaseIndex.forEach(useCase => {
            if (this._useCaseByGroup.has(useCase.useCaseGroup)) {
                this._useCaseByGroup.get(useCase.useCaseGroup)?.push(useCase)
            } else {
                this._useCaseByGroup.set(useCase.useCaseGroup, [useCase])
            }
        });
    }

    /**
     * Init the form fields for the given use case.
     * 
     * This useCase is the one selected by the user.
     *
     * @param {WizardFormService} _wizardFormService
     * @param {string} useCaseGroup
     * @param {string} useCase
     * @memberof UseCaseHandle
     */
    initUseCaseFields(_wizardFormService: WizardFormService, useCaseGroup: string, useCase: string): void {
        const useCaseMeta = this.findUseCaseMeta(useCaseGroup, useCase);

        if (!useCaseMeta) {
            return;
            // throw new Error('The given use case is not defined')
        }

        useCaseMeta.initFields(_wizardFormService);
    }

    /**
     * Return the list of use cases that belongs to the given group.
     * 
     * It returns the meta_class that represents the use case.
     *
     * @param {string} useCaseGroup
     * @return {*}  {UseCaseMetaAbstract[]}
     * @memberof UseCaseHandle
     */
    listUseCasesByGroup(useCaseGroup: string): UseCaseMetaAbstract[] {
        const output = this._useCaseByGroup.get(useCaseGroup);

        if (!output) {
            throw new Error(`The given group: ${useCaseGroup} does not exist.`);
        }

        return output;
    }

    findUseCaseMeta(useCaseGroup: string, useCase: string): IUseCaseMeta | undefined {
        return this._useCaseByGroup.get(useCaseGroup)?.find(uc => uc.useCaseName === useCase);
    }

    destroyUseCase(useCaseGroup: string, useCase: string): void {
        const useCaseMeta = this.findUseCaseMeta(useCaseGroup, useCase);

        if (useCaseMeta) {
            useCaseMeta.destroy();
        }
    }


    /**
     * Return the list of available use case's groups.
     *
     * @readonly
     * @type {string[]}
     * @memberof UseCaseHandle
     */
    public get useCaseGroups(): string[] {
        return Array.from(this._useCaseByGroup.keys());
    }






}