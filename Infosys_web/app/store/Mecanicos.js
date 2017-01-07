Ext.define('Infosys_web.store.Mecanicos', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Mecanicos',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'mecanicos/save', 
            read: preurl + 'mecanicos/getAll',
            update: preurl + 'mecanicos/update'
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