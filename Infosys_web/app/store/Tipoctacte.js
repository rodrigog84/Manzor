Ext.define('Infosys_web.store.Tipoctacte', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.tipoctacte',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'tipoctacte/save', 
            read: preurl + 'tipoctacte/getAll',
            update: preurl + 'tipoctacte/update'
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