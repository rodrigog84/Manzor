Ext.define('Infosys_web.view.Preventa.BuscarProductos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductospreventa',
    
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
                header: "Id",
                width: 100,
                dataIndex: 'id',
                hidden: true
            },{
                header: "Id producto",
                width: 100,
                dataIndex: 'id_producto',
                hidden: true
            },{
                header: "Codigo",
                width: 100,
                dataIndex: 'codigo'
            },{
                header: "Id Producto",
                width: 100,
                dataIndex: 'id_producto',
                hidden: true
            },{
                header: "Nombres",
                width: 750,
                dataIndex: 'nombre'
            },{
                header: "Ubicacion Fisica",
                 width: 100,
                dataIndex: 'nom_bodega',
                hidden: true
            },{
                header: "Id_bodega",
                 width: 100,
                dataIndex: 'id_bodega',
                hidden: true
            },{
                header: "Precio Venta",
                width: 100,
                dataIndex: 'p_venta',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            },{
                header: "Precio Neto",
                width: 100,
                dataIndex: 'p_neto',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")},
                hidden: true
            },{
                header: "Stock",
                width: 100,
                align: 'right',
                dataIndex: 'stock'
            },{
                header: "Stock Critico",
                width: 100,
                align: 'right',
                dataIndex: 'stock_critico',
                hidden: true
            },{
                header: "Stock Total",
                width: 100,
                align: 'right',
                dataIndex: 'stock1',
                hidden: true
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
