<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Facturacompraglosa extends CI_Controller {



	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function save(){
		
		$resp = array();

		$idcliente = $this->input->post('idcliente');
		$numdocuemnto = $this->input->post('numdocumento');
		$fechafactura = $this->input->post('fechafactura');
		$fechavenc = $this->input->post('fechavenc');
		$vendedor = $this->input->post('vendedor');
		$idcondventa = $this->input->post('idcondventa');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('netofactura');
		$fiva = $this->input->post('ivafactura');
        $fafecto = $this->input->post('afectofactura');
		$ftotal = $this->input->post('totalfacturas');
		$tipodocumento = $this->input->post('tipodocumento');
		$idpago = 11;
		$corr = 6;
		$detalle="FACTURA COMPRA SERVICIOS";
		$idCaja = 1;
		$idCajero = 1;
		$estado = "SI";

		$factura_cliente = array(
			'tipo_documento' => $tipodocumento,
	        'id_proveedor' => $idcliente,
	        'num_factura' => $numdocuemnto,
	        'id_vendedor' => $vendedor,
	        'id_cond_venta' => $idcondventa,
	        'sub_total' => $neto,
	        'neto' => $neto,
	        'iva' => $fiva,
	        'totalfactura' => $ftotal,
	        'fecha_factura' => $fechafactura,
	        'fecha_venc' => $fechavenc,
	        'forma' => 1	          
		);

		$this->db->insert('factura_compras', $factura_cliente); 
		$idfactura = $this->db->insert_id();
		
		foreach($items as $v){

			
			$factura_clientes_item = array(
		        'id_factura' => $idfactura,
		        'glosa' => $v->glosa,
		        'neto' => $v->neto,
		        'iva' => $v->iva,
		        'total' => $v->total
			);

		$this->db->insert('detalle_factura_glosa_compras', $factura_clientes_item);

		}

		
		/******* CUENTAS CORRIENTES ****/

		 $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = 'FACTURAS POR COBRAR'");
		 $row = $query->result();
		 $row = $row[0];
		 $idcuentacontable = $row->idcuentacontable;	


			// VERIFICAR SI CLIENTE YA TIENE CUENTA CORRIENTE
		 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
		 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "'");
    	 $row = $query->result();
	
		if ($query->num_rows()==0){	
			$cuenta_corriente = array(
		        'idcliente' => $idcliente,
		        'idcuentacontable' => $idcuentacontable,
		        'saldo' => $ftotal,
		        'fechaactualiza' => date('Y-m-d H:i:s')
			);
			$this->db->insert('cuenta_corriente', $cuenta_corriente); 
			$idcuentacorriente = $this->db->insert_id();


		}else{
			$row = $row[0];
			$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo + " . $ftotal . " where id = " .  $row->idcuentacorriente );
			$idcuentacorriente =  $row->idcuentacorriente;
		}

		$detalle_cuenta_corriente = array(
	        'idctacte' => $idcuentacorriente,
	        'tipodocumento' => $tipodocumento,
	        'numdocumento' => $numdocuemnto,
	        'saldoinicial' => $ftotal,
	        'saldo' => $ftotal,
	        'fechavencimiento' => $fechavenc,
	        'fecha' => date('Y-m-d H:i:s')
		);

		$this->db->insert('detalle_cuenta_corriente', $detalle_cuenta_corriente); 	


		$cartola_cuenta_corriente = array(
	        'idctacte' => $idcuentacorriente,
	        'idcuenta' => $idcuentacontable,
	        'tipodocumento' => $tipodocumento,
	        'numdocumento' => $numdocuemnto,
	        'glosa' => 'Registro de Factura en Cuenta Corriente',
	        'fecvencimiento' => $fechavenc,
	        'valor' => $ftotal,
	        'origen' => 'VENTA',
	        'fecha' => date('Y-m-d H:i:s')
		);

		$this->db->insert('cartola_cuenta_corriente', $cartola_cuenta_corriente); 			

		/*****************************************/

        $resp['success'] = true;
		$resp['idfactura'] = $idfactura;

		$this->Bitacora->logger("I", 'factura_compras', $idfactura);
        

        echo json_encode($resp);
	}


	
	
		
	public function exportfacturaglosaPDF(){

		$idfactura = $this->input->get('idfactura');
		$numero = $this->input->get('numfactura');

		$cabecera = $this->db->get_where('factura_compras', array('id' => $idfactura));	
		$tipodocumento = 1;
		foreach($cabecera->result() as $v){  
				$tipodocumento = $v->tipo_documento; 
		}

			
        if ($idfactura){
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)		
			WHERE acc.id = '.$idfactura.'');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.num_factura = '.$numero.'

		');


		}

		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		$fecha = $row->fecha_venc;
		$numfact = $row->id_factura;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);
		 
		//items
		$items = $this->db->get_where('detalle_factura_glosa_compras', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$rut_cliente = $row->rut_cliente;
		$direccion = $row->direccion;
		$comuna = $row->nombre_comuna;
		$ciudad = $row->nombre_ciudad;
		$fecha = $row->fecha_venc;
		$giro = $row->giro;
		$cabecera = $this->db->get_where('factura_compras', array('id' => $row->id));		
		$montoNeto = 0;
	    $ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
		}
				
		$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
		$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<style type="text/css">
<!--
.cajaInput {
	border: 1px dotted #ED1B24;
}
.style5 {color: #FF0000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 12px; }
.style6 {	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	font-weight: bold;
}
.colorTextoFijo {	color:#008F9F;
	font-weight: bold;
	font:Arial, Helvetica, sans-serif;
}
.lineaDivisoria {
	border-bottom-style:dotted;
	border-bottom-color:#ED1B24;
	border-bottom-width:1px;
	height: 2px;
}
.cajaInputIzq {
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-style: dotted;
	border-bottom-style: dotted;
	border-left-style: dotted;
	border-right-style: dotted;
	border-top-color: #ED1B24;
	border-bottom-color: #ED1B24;
	border-left-color: #ED1B24;
	border-right-color: #ED1B24;
}
.style9 {font-size: 8px;
font-family: Arial, Helvetica, sans-serif;
}
.style12 {color: #FFFFFF}
.style13 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}
.style14 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #FFFFFF; }
.style15 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
}
-->
</style>
</head>

<body>
   <table width="750" border="0" cellpadding="0" cellspacing="0">
   	 
      <tr>
        <td width="450"><span class="style6">&nbsp;</span><span class="colorTextoFijo"></span></td>
		<td class="style6"><center>'.$codigo.'</center></td>
      </tr>      
    </table>
    <p align="right"><b>'.$dia2.'/'.$mes2.'/'.$anio2.'</b></p>
    <p align="right"><b>'.$dia.'/'.$mes.'/'.$anio.'</b></p>
    <br><br>
   
    <br><br>
     
     <table width="650" border="0" cellpadding="0" cellspacing="0">
       <tr>
      
        <td colspan="6" class="style5">'.$nombre_contacto.'</td>
        <td colspan="6" class="style5">'.$direccion.'</td>
       </tr>
      <tr>
        <td colspan="6" class="style5">'.$rut_cliente.'</td>      
        <td colspan="6" class="style5">'.$comuna.'</td>
        </tr>
      <tr>
        <td colspan="6" class="style5">'.$giro.'</td>
        <td colspan="6" class="style5">'.$ciudad.'</td>
        </tr>
    </table>
  
  <table border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
      ';
      $i = 1;
	foreach($items->result() as $v){      
			
     $html .= '<tr>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td ><b>'.$v->glosa.'</b></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td align="right">&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td align="right">&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>       
        <td align="right">'.number_format($v->neto, 0, ',', '.').'</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>       
        <td><p align="right">'.number_format($v->iva, 0, ',', '.').'</b></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        
        <td ><b align="right">'.number_format($v->total, 0, ',', '.').'</b></td>
        <td >&nbsp;</td>
        </tr>';
        $i++;

    }

    if($i < 15){
    	for($j=$i;$j<=15;$j++){
		        $html .= '<tr>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		      	<td >&nbsp;</td>
		      	<td >&nbsp;</td>
		      	<td >&nbsp;</td>
		      	<td >&nbsp;</td>
		       
		        </tr>';
    	}
    }

      
      $html .='<tr>
      <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td ><b>'.number_format($montoNeto, 0, ',', '.').'</b></td>
        </tr>
		<tr>
		<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td ><b>'.number_format($ivaTotal, 0, ',', '.').'</b></td>
        </tr>        
		<tr>
		<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td ><b>'.number_format($totalFactura, 0, ',', '.').'</b></td>
		<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	</tr>
      	<tr>
      	<td ><p>DOCUMENTO REFERENCIADO<br />
      	</tr>
      	<tr>     
        <td >A FACTURA NUMERO</th>
        <td >'.number_format($row->id_factura, 0, ',', '.').'</td>
        </tr>            
</table>
</body>
</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================
		$this->load->library("mpdf");
		//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
		//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

		$this->mpdf->mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$this->mpdf->WriteHTML($html);
		$this->mpdf->Output("CF_{$codigo}.pdf", "I");

		/*$mpdf= new mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		*/
		exit;
	}



	public function exportBoletaPDF($idfactura,$numero){

		//$idfactura = $this->input->get('idfactura');
		//$numero = $this->input->get('numfactura');

        if ($idfactura){
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor FROM factura_clientes acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id = '.$idfactura.'
		');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor FROM factura_clientes acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.num_factura = '.$numero.'

		');


		}

		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		//items
		$items = $this->db->get_where('detalle_factura_cliente', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$rut_cliente = $row->rut_cliente;
		$direccion = $row->direccion;
		$comuna = $row->nombre_comuna;
		$ciudad = $row->nombre_ciudad;
		$giro = $row->giro;
		$fecha = $row->fecha_venc;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);

		$cabecera = $this->db->get_where('factura_clientes', array('id' => $row->id));		
		$montoNeto = 0;
		$ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
		}
				
$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<style type="text/css">
<!--
.cajaInput {
	border: 1px dotted #ED1B24;
}
.style5 {color: #FF0000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 12px; }
.style6 {	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	font-weight: bold;
}
.colorTextoFijo {	color:#008F9F;
	font-weight: bold;
	font:Arial, Helvetica, sans-serif;
}
.lineaDivisoria {
	border-bottom-style:dotted;
	border-bottom-color:#ED1B24;
	border-bottom-width:1px;
	height: 2px;
}
.cajaInputIzq {
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-style: dotted;
	border-bottom-style: dotted;
	border-left-style: dotted;
	border-right-style: dotted;
	border-top-color: #ED1B24;
	border-bottom-color: #ED1B24;
	border-left-color: #ED1B24;
	border-right-color: #ED1B24;
}
.style9 {font-size: 8px;
font-family: Arial, Helvetica, sans-serif;
}
.style12 {color: #FFFFFF}
.style13 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}
.style14 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #FFFFFF; }
.style15 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
}
-->
</style>
</head>

<body>
   <table width="650" border="0" cellpadding="0" cellspacing="0">
   	  
      <tr>
        <td width="450"><span class="style6">&nbsp;</span><span class="colorTextoFijo"></span></td>
		<td class="style6"><center>'.$codigo.'</center></td>
      </tr>
    </table>
    <p align="right"><b>'.$dia2.'/'.$mes2.'/'.$anio2.'</b></p>
    <p align="right"><b>'.$dia.'/'.$mes.'/'.$anio.'</b></p>
    <br><br>
  <table>
  <tr>
    <td>&nbsp;</td>
   
    <td>&nbsp;</td>
  </tr>
  </table>

  <table border="0" cellspacing="0" cellpadding="0">
  		<tr>
         <td>&nbsp;</td>        
        </tr>
        <tr>
         <td>&nbsp;</td>        
        </tr>
        <tr>
         <td>&nbsp;</td>        
        </tr>
        <tr>
         <td>&nbsp;</td>        
        </tr>
      ';
      $i = 1;
	foreach($items->result() as $v){      
			$this->db->where('id', $v->id_producto);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];

     $html .= '<tr>
        <td >'.$v->cantidad.'</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td ><b>'.$producto->nombre.'</b></td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        
        <td >'.number_format($v->precio, 0, ',', '.').'</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >'.number_format($v->descuento, 0, ',', '.').'</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td ><b>'.number_format($v->totalproducto, 0, ',', '.').'</b></td>
        </tr>';
        $i++;

    }

    if($i < 15){
    	for($j=$i;$j<=15;$j++){
		        $html .= '<tr>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        
		        </tr>';
    	}
    }

      
      $html .='
      	<tr>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td ><b>'.number_format($totalFactura, 0, ',', '.').'</b></td>
        </tr>                
</table>
</body>
</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================
		$this->load->library("mpdf");
		//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
		//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

		$this->mpdf->mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$this->mpdf->WriteHTML($html);
		$this->mpdf->Output("CF_{$codigo}.pdf", "I");

		/*$mpdf= new mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		*/
		exit;
	}	
}











