Ext.define('Infosys_web.view.compras.BuscarProductos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductosfacturascompras',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos',
    layout: 'fit',
    autoShow: true,
    width: 1080,
    height: 480,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',
            title : 'Productos',
            store: 'ProductosE',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Codigo",
                width: 100,
                dataIndex: 'codigo'
            },{
                header: "Nombres",
                width: 450,
                dataIndex: 'nombre'
            },{
                header: "Ubicacion Fisica",
                 width: 250,
                dataIndex: 'nom_bodega'
            },{
                header: "Precio Venta",
                width: 150,
                dataIndex: 'p_venta',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            },{
                header: "Stock",
                width: 100,
                align: 'right',
                dataIndex: 'stock'
            }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 450,
                xtype: 'textfield',
                itemId: 'bodegaId',
                fieldLabel: 'Bodega',
                hidden: true
            },{
                width: 450,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscar',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarproductos',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'ProductosE',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
