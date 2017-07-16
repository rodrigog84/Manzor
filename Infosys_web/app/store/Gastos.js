Ext.define('Infosys_web.store.Gastos', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.gastos.Item',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'gastos/save', 
            read: preurl + 'gastos/getAll',
            update: preurl + 'gastos/update'
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