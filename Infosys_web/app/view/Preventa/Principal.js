Ext.define('Infosys_web.view.Preventa.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.preventaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'ORDEN DE TRABAJO',
    store: 'Preventa',
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
        header: "N.O.TRABAJO",
        flex: 1,
        dataIndex: 'num_ticket'
               
    },{
        header: "Tipo Documento",
        flex: 1,
        dataIndex: 'id_tip_docu',
        hidden : true
               
    },{
        header: "Forma de Pago",
        flex: 1,
        dataIndex: 'id_pago',
        hidden : true
               
    },{
        header: "Documento",
        flex: 1,
        dataIndex: 'nom_documento'
               
    },{
        header: "Fecha Orden",
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
        header: "Giro",
        width: 390,
        dataIndex: 'nom_giro',
        hidden: true
    },{
        header: "Direccion",
         width: 390,
        dataIndex: 'direccion',
        hidden: true
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor'
    },{
        header: "Id_Vendedor",
        flex: 1,
        dataIndex: 'id_vendedor',
        hidden: true
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
    },{
        header: "Id Sucursal",
        flex: 1,
        dataIndex: 'id_sucursal',
        hidden: true
    },{
        header: "Direccion",
        flex: 1,
        dataIndex: 'direccion_sucursal',
        hidden: true
    },{
        header: "Comuna",
        flex: 1,
        dataIndex: 'comuna',
        hidden: true
    },{
        header: "Ciudad",
        flex: 1,
        dataIndex: 'ciudad',
        hidden: true
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarpreventa',
                text : 'Nueva Orden'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'ventadirecta',
                text : 'Venta Directa'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarpreventa',
                text : 'Editar / Agregar'
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
                action:'exportarexcelpreventa'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'eliminarpreventa',
                text : 'Eliminar'
            },{
                width: 80,
                labelWidth: 20,
                xtype: 'textfield',
                itemId: 'recaudaId',
                fieldLabel: 'Recauda',
                readOnly: true,
                hidden :true
            },{
                width: 80,
                labelWidth: 20,
                xtype: 'textfield',
                itemId: 'cajaId',
                fieldLabel: 'Caja',
                readOnly: true,
                hidden :true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'textfield',
                itemId: 'nomcajaId',
                fieldLabel: 'Caja',
                labelAlign: 'top',
                readOnly: true
            },{
                width: 100,
                xtype: 'textfield',
                itemId: 'cajeroId',
                fieldLabel: 'Cajero',
                readOnly: true,
                hidden: true
            },{
                width: 210,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'nomcajeroId',
                labelAlign: 'top',
                fieldLabel: 'Cajero',
                readOnly: true
            },{
                width: 110,
                xtype: 'numberfield',
                itemId: 'efectivonId',
                fieldLabel: 'Efectivo',
                hidden: true
            },{
                width: 70,
                xtype: 'numberfield',
                itemId: 'comprobanteId',
                fieldLabel: '',
                hidden: true
            },{
                xtype: 'textfield',
                fieldCls: 'required',
                width: 100,
                name : 'efectivo',
                itemId: 'efectivoId',
                readOnly: true,
                aling: 'center',
                fieldLabel: 'Efectivo',
                labelAlign: 'top',
                renderer: function(valor){return Ext.util.Format.number(parseInt(efectivo),"0.000")}

            },{
                width: 140,
                labelWidth: 50,
                xtype: 'numberfield',
                itemId: 'totchequesnId',
                fieldLabel: 'Cheques',
                hidden: true
            },{
                width: 100,
                labelWidth: 50,
                xtype: 'textfield',
                itemId: 'totchequesId',
                fieldLabel: 'Cheques',
                name: 'cheques',
                labelAlign: 'top',
                renderer: function(valor){return Ext.util.Format.number(parseInt(cheques),"0,00")},
                readOnly: true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'numberfield',
                itemId: 'otrosmontosnId',
                labelAlign: 'top',
                fieldLabel: 'Otros',
                hidden: true
            },{
                width: 100,
                labelWidth: 40,
                xtype: 'textfield',
                itemId: 'otrosmontosId',
                labelAlign: 'top',
                name: 'otros',
                fieldLabel: 'Otros',
                renderer: function(valor){return Ext.util.Format.number(parseInt(otros),"0,00")},
                readOnly: true
            },{
                xtype: 'datefield',
                fieldCls: 'required',
                //maxHeight: 25,
                labelWidth: 60,
                labelAlign: 'top',
                width: 100,
                fieldLabel: '<b>Fecha</b>',
                itemId: 'fechaaperturaId',
                name: 'fecha_apertura'
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
                align: 'center',
                width: 260,
                labelWidth: 85,
                maxHeight: 25,
                matchFieldWidth: false,
                listConfig: {
                    width: 175
                },
                itemId: 'tipoDocumentoId',
                fieldLabel: '<b>DOCUMENTO</b>',
                fieldCls: 'required',
                store: 'Tipo_documento.Selector',
                valueField: 'id',
                displayField: 'nombre'
            },{
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
                action: 'buscarpreventa',
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
            store: 'Preventa',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
