Ext.define('Infosys_web.store.vale', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Preventa',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'vale/save', 
            read: preurl + 'vale/getAll',
            update: preurl + 'vale/update'
            //destroy: 'php/deletaContacto.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});