Ext.define('Infosys_web.view.Preventa.BuscarProductos2' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductospreventa2',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos',
    layout: 'fit',
    autoShow: true,
    width: 1080,
    height: 580,
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
                flex: 1,
                dataIndex: 'nom_ubi_prod',
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
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscar2',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarproductos2',
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
