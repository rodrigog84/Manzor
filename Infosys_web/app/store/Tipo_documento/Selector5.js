Ext.define('Infosys_web.store.Tipo_documento.Selector5', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"FACTURA"},
        {"id":"101", "nombre":"FACTURA ELECTRÓNICA"},
        {"id":"2", "nombre":"BOLETA"},
        {"id":"107", "nombre":"BOLETA ELECTRÓNICA"},
     	{"id":"3", "nombre":"GUIA DESPACHO"}, 
     	{"id":"105", "nombre":"GUIA DESPACHO ELECTRÓNICA"}, 
    ]
});