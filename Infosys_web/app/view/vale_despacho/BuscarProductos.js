Ext.define('Infosys_web.view.vale_despacho.BuscarProductos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductosvaledespacho',
    
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
                width: 450,
                dataIndex: 'nombre'
            },{
                header: "Bodega",
                 width: 250,
                dataIndex: 'nom_bodega'
            },{
                header: "Bodega",
                 width: 250,
                dataIndex: 'id_bodega',
                hidden: true
            },{
                header: "Stock",
                 width: 100,
                dataIndex: 'stock'
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
                action: 'buscar',
                text : 'Buscar'
            },'->',{
                xtype: 'combo',
                itemId: 'bodegaId',
                labelWidth: 60,
                width: 205,
                fieldCls: 'required',
                maxHeight: 25,
                fieldLabel: '<b>BODEGA</b>',
                forceSelection : true,
                name : 'id_bodega',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Bodegas',
                readOnly: true
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
