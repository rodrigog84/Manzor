Ext.define('Infosys_web.store.FacturaCompras', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Factura',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'compras/save', 
            read: preurl + 'compras/getAll',
            update: preurl + 'compras/update'
            //destroy: 'php/deletaContacto.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});