Ext.define('Infosys_web.view.vale_despacho.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.valedespachoprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'VALE DESPACHO INTERNO',
    store: 'vale',
    height: 300,
    viewConfig: {
        forceFit: true
    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id',
        hidden: true
               
    },{
        header: "VALE",
        flex: 1,
        dataIndex: 'num_vale'
               
    },{
        header: "Fecha Despacho",
        flex: 1,
        dataIndex: 'fecha_venta',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y') 
    },{
        header: "Rut",
        flex: 1,
        align: 'right',
        dataIndex: 'rut_cliente'
    },{
        header: "Razon Social",
        width: 390,
        dataIndex: 'nom_cliente'
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'neto',
        hidden: true,
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        aling: 'rigth'
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'desc',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        hidden: true
    },{
        header: "Total Venta",
        flex: 1,
        dataIndex: 'total',       
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        align: 'right'        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'valedespacho',
                text : 'Vale Despacho'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarpreventa',
                text : 'Editar / Agregar',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'exportarpreventa'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelpreventa',
                hidden: true
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'eliminarpreventa',
                text : 'Eliminar',
                hidden: true
            },'->',{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Genera Guia',
                action:''
            }],
                  
        },{
            xtype: 'toolbar',
            dock: 'top',
            items: ['-',{
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
                store : 'Bodegas'
            },'->',{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 100,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'facturas.Selector2'
            },{
                width: 200,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarvaledespacho',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpreventa',
                text : 'Cerrar'
            }],
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'vale',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
