Ext.define('Infosys_web.store.facturas.Selector3', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"GENERAL", "nombre":"GENERAL"},
        {"id":"LIBRO VENTAS", "nombre":"LIBRO COMPRAS"},
        {"id":"RESUMEN", "nombre":"RESUMEN"}           
    ]
});