/**
 * @copyright © 2022, Oracle and/or its affiliates. All rights reserved.
 *
 * @NApiVersion 2.x
 * @NModuleScope Public
 * @NScriptType ClientScript
 */

import { EntryPoints } from "N/types";

export function fieldChanged(context: EntryPoints.Client.fieldChangedContext): void {}

export function lineinit(context: EntryPoints.Client.lineInitContext): void {}

export function pageInit(context: EntryPoints.Client.pageInitContext): void {}

export function postSourcing(context: EntryPoints.Client.postSourcingContext): void {}

export function saveRecord(context: EntryPoints.Client.saveRecordContext): void {}

export function sublistChanged(context: EntryPoints.Client.sublistChangedContext): void {}

export function validateDelete(context: EntryPoints.Client.validateDeleteContext): void {}

export function validateField(context: EntryPoints.Client.validateFieldContext): void {}

export function validateInsert(context: EntryPoints.Client.validateInsertContext): void {}

export function validateLine(context: EntryPoints.Client.validateLineContext): void {}

export function localizationContextEnter(context: any): void {}

export function localizationContextExit(context: any): void {}
