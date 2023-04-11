

import record from "N/record";

var rec = record.create({ type: 'type_id', isDynamic: true }),
    recValue = rec.getValue({ fieldId: 'custrecord_field_id' });

rec.setValue({ fieldId: 'custrecord_field_id', value: recValue })

var recId = rec.save({ ignoreMandatoryFields: true });

//The same script can be done like this:

var rec = record.create({ type: 'type_id', isDynamic: true }),

    recValue = record.load({ type: 'type_id', id: rec.id })
        .getValue({ fieldId: 'custrecord_field_id' }),

    recId = rec.setValue({ fieldId: 'custrecord_field_id', value: recValue })
        .save({ ignoreMandatoryFields: true });
    
