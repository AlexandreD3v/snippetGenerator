/**
 * @copyright © 2022, Oracle and/or its affiliates. All rights reserved.
 *
 * @NApiVersion 2.x
 * @NModuleScope Public
 * @NScriptType ClientScript
 * @Author: Alexandre J. C. - 09/12/22
 */

import { EntryPoints } from "N/types";
import log from "N/log";
import search from "N/search";
import error from "N/error";
import * as csEnum from "./quod_make_mandatory_enum";

let hasCogsNotSaved = false, itemCogsName = "", campoObrigatorioIsNotEmpy;

//O método fieldChanged é responsável por identificar quando um item é inserido para adição na linha de itens
export function fieldChanged(context: EntryPoints.Client.fieldChangedContext): void {
    try {
        if (context.fieldId != "item") return;
        let sublistid = "item",
            itemlinhaId = Number(context.currentRecord.getCurrentSublistValue({
                sublistId: sublistid,
                fieldId: "item"
            })),
            itemIsMandatory, itemName;


        if (Number(itemlinhaId) <= 0) return;
        //Recupera a flag do item
        itemIsMandatory = search.lookupFields({
            type: "serviceitem",
            columns: "custitem_quod_make_mandatory",
            id: itemlinhaId
        });
        //Recupera o nome do item
        itemName = search.lookupFields({
            type: "serviceitem",
            columns: "displayname",
            id: itemlinhaId
        });

        //Se o item solicitar a obrigatoriedade do campo
        if (itemIsMandatory.custitem_quod_make_mandatory != true) return;

        //Exibe alerta em tela
        alert(csEnum.messages.itemHasMandatoryField);

        //Sinaliza que há um item de cogs não salvo
        hasCogsNotSaved = true;

        //Salva o nome do item
        itemCogsName = String(itemName.displayname);

    } catch (error) {//Error handling
        log.error("erro fieldChanged", error);
        throw error;
    }
}

//O método saveRecord é responsável por verificar quando um item é inserido na adição na linha de itens e não possui o campo preenchido
export function saveRecord(context: EntryPoints.Client.saveRecordContext): void {
    try {
        //Campo obrigatório para verificação se existir um item de cogs não salvo
        campoObrigatorioIsNotEmpy = context.currentRecord.getCurrentSublistValue({
            fieldId: "custcol_quod_pedido_custo_fatura",
            sublistId: "item"
        });

        //@ts-ignore
        if (!hasCogsNotSaved || campoObrigatorioIsNotEmpy) return true;//Caso não tenha item ou esteja preenchido, o script permite a criação do pedido de compra

        //Exibe mensagem de erro 
        throw error.create({
            name: "MISSING_REQ_ARG",
            message: csEnum.messages.clienteAssMandatory + itemCogsName + "!"
        });
    } catch (error) {//Error handling
        log.error("erro saveRecord", error);
        throw error;
    }
}

//O método validateLine é responsável por verificar quando um item é inserido na linha de itens e não possui o campo preenchido
//Caso o campo já esteja preenchido, então sinaliza que o mesmo já está correto e permite a adição de outro item
export function validateLine(context: EntryPoints.Client.validateLineContext): void {
    try {
        //Campo obrigatório para verificação
        campoObrigatorioIsNotEmpy = context.currentRecord.getCurrentSublistValue({
            fieldId: "custcol_quod_pedido_custo_fatura",
            sublistId: "item"
        });
        //Verifica se existe um item de cogs não salvo
        //@ts-ignore
        if (!hasCogsNotSaved || hasCogsNotSaved && campoObrigatorioIsNotEmpy) {
            //Reinicia as variáveis auxíliares
            hasCogsNotSaved = false;
            itemCogsName = "";

            //@ts-ignore
            return true;
        }

        //Se o campo obrigatório estiver vazio
        //Exibe alerta de erro 
        alert(csEnum.messages.clienteAssMandatory + itemCogsName + "!");

        //@ts-ignore
        return false;

    } catch (error) {//Error handling
        log.error("erro validateLine", error);
        throw error;
    }
}