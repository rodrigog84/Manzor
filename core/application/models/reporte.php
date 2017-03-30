<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* Name:  Ion Auth Model
*
* Version: 2.5.2
*
* Author:  Ben Edmunds
* 		   ben.edmunds@gmail.com
*	  	   @benedmunds
*
* Added Awesomeness: Phil Sturgeon
*
* Location: http://github.com/benedmunds/CodeIgniter-Ion-Auth
*
* Created:  10.01.2009
*
* Last Change: 3.22.13
*
* Changelog:
* * 3-22-13 - Additional entropy added - 52aa456eef8b60ad6754b31fbdcc77bb
*
* Description:  Modified auth system based on redux_auth with extensive customization.  This is basically what Redux Auth 2 should be.
* Original Author name has been kept but that does not mean that the method has not been modified.
*
* Requirements: PHP5 or above
*
*/

class Reporte extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('cookie');
		$this->load->helper('date');
	}


	public function mensual_ventas($mes,$anno){

       	$neto_productos = $this->db->query("select concepto, Facturacion, Boletas, NDebito, NCredito, (Facturacion+Boletas+NDebito-NCredito) as totales from
        		(select '<b>Neto Productos</b>' as concepto,
				(select 
				COALESCE(SUM(neto),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (1,19,101,103) ) as 'Facturacion',
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas', 
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104) )  as 'NDebito', 
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito'
				union all
					select '<b>Neto Afecto</b>' as concepto,
				(select 
				COALESCE(SUM(neto),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (1,101) ) as 'Facturacion',
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106)  and iva > 0 )  as 'Boletas', 
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104)  and iva > 0 )  as 'NDebito',
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102)  and iva > 0 )  as 'NCredito'
				union all
					select '<b>Neto Exento</b>' as concepto,
				(select 
				COALESCE(SUM(neto),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (19,103) ) as 'Facturacion',
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106)  and iva = 0 )  as 'Boletas', 				
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104)   and iva = 0)  as 'NDebito',
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102)   and iva = 0)  as 'NCredito'
				union all
				select '<b>Impuesto IVA</b>' as concepto,
				(select 
				COALESCE(SUM(iva),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in  (1,19,101,103) ) as 'Facturacion',
				(select 
				COALESCE(SUM(iva),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas', 				
				(select 
				COALESCE(SUM(iva),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104))  as 'NDebito',
				(select 
				COALESCE(SUM(iva),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito'
				union all
				select '<b>Totales</b>' as concepto,
				(select 
				COALESCE(SUM(totalfactura),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in  (1,19,101,103) ) as 'Facturacion',
				(select 
				COALESCE(SUM(totalfactura),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas', 				
				(select 
				COALESCE(SUM(totalfactura),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104))  as 'NDebito',
				(select 
				COALESCE(SUM(totalfactura),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito'
        ) as tmp");
		
		return $neto_productos->result();

	}

}
