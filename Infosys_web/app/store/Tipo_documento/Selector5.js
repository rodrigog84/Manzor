Ext.define('Infosys_web.store.Tipo_documento.Selector5', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"FACTURA"},
        {"id":"2", "nombre":"FACTURA ELECTRÓNICA"},
        {"id":"3", "nombre":"BOLETA"},
        {"id":"4", "nombre":"BOLETA ELECTRÓNICA"},
     	{"id":"5", "nombre":"GUIA DESPACHO"}, 
     	{"id":"6", "nombre":"GUIA DESPACHO ELECTRÓNICA"}, 
    ]
});