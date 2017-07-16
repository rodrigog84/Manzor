Ext.define('Infosys_web.model.gastos.Item', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_caja'},
        {name: 'id_cajero'},
        {name: 'numero'},
        {name: 'detalle'},
    	{name: 'fecha', type:'date',dateFormat:"Y-m-d"},
    	{name: 'nom_doc'},
        {name: 'monto'}
        ]
});