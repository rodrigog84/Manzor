Ext.define('Infosys_web.model.Bodegas', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'nombre'},
        {name: 'direccion'},
        {name: 'codigo'},
        {name: 'num_boleta'},
        {name: 'num_otrabajo'},
        {name: 'num_despacho'},
        {name: 'id_cliente'},
        {name: 'id_sucursal'},
        {name: 'rut'},
    	]
});