<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Vale extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function elimina2(){

	    $resp = array();
	    $idcliente = $this->input->post('idcliente');

	     $query = $this->db->query('SELECT * FROM vale WHERE id = "'.$idcliente.'" AND estado = ""');

	   	 if($query->num_rows()>0){

	   	 	$query = $this->db->query('DELETE FROM vale WHERE id = "'.$idcliente.'"');
	    	$query = $this->db->query('DELETE FROM vale_detalle WHERE id_vale = "'.$idcliente.'"');

	    	$resp['success'] = true;

	   	 }else{

	   	 	$resp['success'] = false;
	   	 	

	   	 };	  
	   
	    
	    echo json_encode($resp);	   

	}


	public function getObserva(){

		$resp = array();
		$idobserva = $this->input->post('idobserva');

		$query = $this->db->query('SELECT * FROM observacion_vale 
	   	WHERE id like "'.$idobserva.'"');
	   	$data = array();
	   	if($query->num_rows()>0){			   
		   foreach ($query->result() as $row)
			{
			$rutautoriza = $row->rut;
		   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);		   
		    };
		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut = ($ruta2."-".$ruta1);		     
		    };
		     $row->rutm = $rutautoriza;
		     $data[] = $row;
		     $resp['observar'] = $row;
		     $resp['success'] = true;
		     $resp['data'] = $data;
	   		 $resp['existe'] = true;
			 
			}	   			

	   		}else{
	   			$resp['success'] = false;	
	   		};

	  ;
	  
	   echo json_encode($resp);
	}

	public function validaRut(){

		
		$resp = array();
		$rut = $this->input->get('valida');
        $iddocu = 1;
		
		if(strpos($rut,"-")==false){
	        $RUT[0] = substr($rut, 0, -1);
	        $RUT[1] = substr($rut, -1);
	    }else{
	        $RUT = explode("-", trim($rut));
	    }
	    $elRut = str_replace(".", "", trim($RUT[0]));
	    $factor = 2;
	    $suma=0;
	    for($i = strlen($elRut)-1; $i >= 0; $i--):
	        $factor = $factor > 7 ? 2 : $factor;
	        $suma += $elRut{$i}*$factor++;
	    endfor;
	    $resto = $suma % 11;
	    $dv = 11 - $resto;
	    if($dv == 11){
	        $dv=0;
	    }else if($dv == 10){
	        $dv="k";
	    }else{
	        $dv=$dv;
	    }

	   if($dv == trim(strtolower($RUT[1]))){

	   	    $query = $this->db->query('SELECT * FROM observacion_vale 
	   	    WHERE rut like "'.$rut.'"');

	   	    if($query->num_rows()>0){

			   $data = array();
			   foreach ($query->result() as $row)
				{
				$rutautoriza = $row->rut;
			   	if (strlen($rutautoriza) == 8){
			      $ruta1 = substr($rutautoriza, -1);
			      $ruta2 = substr($rutautoriza, -4, 3);
			      $ruta3 = substr($rutautoriza, -7, 3);
			      $ruta4 = substr($rutautoriza, -8, 1);
			      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
			    };
			    if (strlen($rutautoriza) == 9){
			      $ruta1 = substr($rutautoriza, -1);
			      $ruta2 = substr($rutautoriza, -4, 3);
			      $ruta3 = substr($rutautoriza, -7, 3);
			      $ruta4 = substr($rutautoriza, -9, 2);
			      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);		   
			    };
			     if (strlen($rutautoriza) == 2){
			      $ruta1 = substr($rutautoriza, -1);
			      $ruta2 = substr($rutautoriza, -4, 1);
			      $row->rut = ($ruta2."-".$ruta1);		     
			    };	   
				$data[] = $row;
				}
	   			$resp['observa'] = $row;
	   			$resp['existe'] = true;
	   			$resp['success'] = true;
	   			echo json_encode($resp);
	        	return false;

	   		}else{
	   			$rutautoriza = $rut;
		   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);		   
		    };
		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $rut = ($ruta2."-".$ruta1);		     
		    };		  
			
	        $resp['rut'] = $rut;
	        $resp['existe'] = false;
	        $resp['success'] = true;
	        echo json_encode($resp);
	        return false;

	   		};

	   		
	   }else{
	   	    $resp['success'] = false;
	   	    echo json_encode($resp);
	        return false;
	   }
	
	}

	public function saveobserva(){

		$resp = array();
		$nombre = $this->input->post('nombre');
		$camion = $this->input->post('camion');
		$carro = $this->input->post('carro');
		$fono = $this->input->post('fono');
		$numero = $this->input->post('numero');
		$observa = $this->input->post('observa');
		$id = $this->input->post('id');

		if(!$id){

		$observa = array(
			'nombre' => $nombre,
	        'id_vale' => $numero,
	        'fono' => $fono,
	        'pat_camion' => $camion,
	        'pat_carro' => $carro,
	        'observacion' => $observa	          
		);

		$this->db->insert('observacion_vale', $observa);
		$idobserva = $this->db->insert_id();

	    }else{

	    	$observa = array(
			'rut' => $rut,
			'nombre' => $nombre,
	        'id_vale' => $numero,
	        'fono' => $fono,
	        'pat_camion' => $camion,
	        'pat_carro' => $carro,
	        'observacion' => $observa	          
			);

			$this->db->where('id', $id);
		  
		    $this->db->update('observacion_vale', $observa);
		    $idobserva = $id;
	    	

	    }
		$resp['success'] = true;
		$resp['idobserva'] = $idobserva;
		echo json_encode($resp);
	}

	public function elimina(){

		$resp = array();
		$idproducto = $this->input->post('producto');
		$idticket = $this->input->post('idticket');

		$query = $this->db->query('DELETE FROM vale_detalle WHERE id_ticket = "'.$idticket.'" & id_producto = "'.$idproducto.'"');

		$resp['success'] = true;
       

        echo json_encode($resp);				

	}

	public function edita(){

		$resp = array();
		$idpreventa = $this->input->get('idpreventa');
		
		$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, c.direccion as direccion,
		c.id_pago as id_pago, suc.direccion as direccion_sucursal, ciu.nombre as ciudad, com.nombre as comuna, cod.nombre as nom_giro FROM vale acc
		left join clientes c on (acc.id_cliente = c.id)
		left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
		left join comuna com on (suc.id_comuna = com.id)
		left join ciudad ciu on (suc.id_ciudad = ciu.id)
		left join cod_activ_econ cod on (c.id_giro = cod.id)
		WHERE acc.id = "'.$idpreventa.'"
		');

		$row1 = $query->result();
		$row = $row1[0];
	   	
	    	
	    $items = $this->db->get_where('vale_detalle', array('id_ticket' => $idpreventa));

	   	$secuencia = 0;

	   	foreach($items->result() as $item){
			
			$secuencia = $secuencia + 1;
			
		};

		$row = $query->first_row();
	   	$resp['cliente'] = $row;
	    $resp['success'] = true;
	    $resp['secuencia'] = $secuencia;       

        echo json_encode($resp);
	}

	public function editapreventa(){

		$resp = array();
		$idcotiza = $this->input->get('idcotiza');
		$factura = 6;
		$correla = $this->db->query('SELECT * FROM correlativos WHERE id like "'.$factura.'"');

		if($correla->num_rows()>0){
	   		$row = $correla->first_row();
	   		$corr = (($row->correlativo)+1); 
	   		$id = ($row->id);

	   		$data3 = array(
	         'correlativo' => $corr
		    );

		    $this->db->where('id', $id);
		  
		    $this->db->update('correlativos', $data3);

		    $this->Bitacora->logger("M", 'correlativos', $id);

		 }
		
		$query = $this->db->query('SELECT ctz.*, cli.direccion as direccion_sucursal, cli.id as id_cliente, cli.nombres as nombres, cli.id_giro as giro, g.nombre as nombre_giro, cli.rut as rut, cli.id_pago as id_pago, cli.direccion as direccion FROM cotiza_cotizaciones ctz
		left join clientes cli ON (ctz.id_cliente = cli.id)
		left join cod_activ_econ g on (cli.id_giro = g.id)
		WHERE ctz.id = '.$idcotiza.'
		');

		$row1 = $query->result();
		$row = $row1[0];
		$rutautoriza = $row->rut;
	   	   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		   
		    };

		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut = ($ruta2."-".$ruta1);
		     
		    };
		 

	   	$row = $query->first_row();
	   	$resp['cliente'] = $row;
	   	$resp['correlanue'] = $corr;
	    $resp['success'] = true;
       

        echo json_encode($resp);
	}

	public function edita3(){

		$resp = array();
		$idpreventa = $this->input->get('idpreventa');
		$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, c.direccion as direccion,
		c.id_pago as id_pago, suc.direccion as direccion_sucursal, ciu.nombre as ciudad, com.nombre as comuna, cor.nombre as nom_documento, cod.nombre as nom_giro FROM preventa acc
		left join correlativos cor on (acc.id_tip_docu = cor.id)
		left join clientes c on (acc.id_cliente = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
		left join comuna com on (suc.id_comuna = com.id)
		left join ciudad ciu on (suc.id_ciudad = ciu.id)
		left join cod_activ_econ cod on (c.id_giro = cod.id)		
		WHERE acc.num_ticket = "'.$idpreventa.'"
		');


		$row1 = $query->result();
		$row = $row1[0];
		$rutautoriza = $row->rut_cliente;
	   	   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		   
		    };

		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };

		   if (strlen($rutautoriza) == 7){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $row->rut_cliente = ($ruta3.".".$ruta2."-".$ruta1);
		     
		    };
		    
		    
		    if (strlen($rutautoriza) == 4){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };	


		     if (strlen($rutautoriza) == 6){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -6, 2);
		      $row->rut_cliente = ($ruta3.".".$ruta2."-".$ruta1);
		     
		    };		

	   	$row = $query->first_row();
	   	
	   	$resp['cliente'] = $row;

	    $resp['success'] = true;
	

        echo json_encode($resp);
	}

	public function edita2(){

		$resp = array();
		$idpreventa = $this->input->post('idpreventa');
		$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, c.direccion as direccion,
		c.id_pago as id_pago, suc.direccion as direccion_sucursal, ciu.nombre as ciudad, com.nombre as comuna, cor.nombre as nom_documento, cod.nombre as nom_giro FROM preventa acc
		left join correlativos cor on (acc.id_tip_docu = cor.id)
		left join clientes c on (acc.id_cliente = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
		left join comuna com on (suc.id_comuna = com.id)
		left join ciudad ciu on (suc.id_ciudad = ciu.id)
		left join cod_activ_econ cod on (c.id_giro = cod.id)		
			WHERE acc.id = "'.$idpreventa.'"
		');

		$row1 = $query->result();
		$row = $row1[0];		

	   	$items = $this->db->get_where('preventa_detalle', array('id_ticket' => $idpreventa));

	   	$data = array();

	   	foreach($items->result() as $item){
			$this->db->where('id', $item->id_producto);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];
			$item->nombre = $producto->nombre;
			$item->precio = $item->valor_unit;
			$item->totaliva = $item->total;
			$item->dcto = $item->desc;	
			$data[] = $item;
		}

	   	$row = $query->first_row();

	   	$items = $items->first_row();
	   	
	   	$resp['cliente'] = $row;

	    $resp['success'] = true;
        $resp['data'] = $data;   
	

        echo json_encode($resp);
	}

	public function exportPDF(){
		$idvale = $this->input->get('idpreventa');
		$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, c.direccion as direccion, c.id_pago as id_pago, suc.direccion as direccion_sucursal, ciu.nombre as ciudad, com.nombre as comuna, cod.nombre as nom_giro, pag.nombre as nom_pago, ob.rut as rut_observa, ob.nombre as nom_observa, ob.observacion as observacion, bo.nombre as bodegaentrada, ba.nombre as bodegasalida FROM vale acc
		left join clientes c on (acc.id_cliente = c.id)
		left join observacion_vale ob on (acc.id_observa = ob.id)
		left join bodegas bo on (acc.id_bodegaentrada = bo.id)
		left join bodegas ba on (acc.id_bodegasalida = ba.id)		
		left join cond_pago pag on (c.id_pago = pag.id)
		left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
		left join comuna com on (c.id_comuna = com.id)
		left join ciudad ciu on (c.id_ciudad = ciu.id)
		left join cod_activ_econ cod on (c.id_giro = cod.id)
		WHERE acc.id = "'.$idvale.'"
		');
		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		//items
		$items = $this->db->get_where('vale_detalle', array('id_vale' => $idvale));
		//variables generales
		$codigo = $row->num_vale;
		$nombre_contacto = $row->nom_cliente;
		$observacion = $row->observacion;
		//$rutobserva = $row->rut_observa;
		$nom_observa = $row->nom_observa;
		$fecha = $row->fecha_venta;
		$datetime = DateTime::createFromFormat('Y-m-d', $fecha);
		$fecha = $datetime->format('d/m/Y');
		$totaliva = 0;
		$neto = ($row->total / 1.19);
		$iva = ($row->total - $neto);
		$subtotal = ($row->total + $row->desc);
		$bodegasalida = ($row->bodegasalida);
		$bodegaentrada = ($row->bodegaentrada);

		if($row->direccion_sucursal == " "){

			$direccion = $row->direccion;
			$ciudad = $row->ciudad;
			$comuna = $row->comuna;
			
		}else{

			$direccion = $row->direccion_sucursal;
			$ciudad = $row->ciudad;
			$comuna = $row->comuna;
			
		};

		$html = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Vale Despacho</title>
		<style type="text/css">
		td {
			font-size: 16px;
		}
		p {
		}
		</style>
		</head>

		<body>
		<table width="987px" height="602" border="0">
		    </td>
		  <tr>
		  <td width="197px"><img src="http://angus.agricultorestalca.cl/manzor/Infosys_web/resources/images/logo_empresa.png" width="150" height="136" /></td>
		    <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top"	>
		    <p>SERGIO ADRIAN MANZOR MANCILLA</p>
		    <p>RUT:3.992.565-6</p>
		    <p>2 SUR # 1629 - Talca - Chile</p>
		    <p>Fonos: (71)2 510250</p>
		    <p>http://</p>
		    </td>
		    <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top"	>
		          <p>VALE N°: '.$codigo.'</p>
		          <!--p>&nbsp;</p-->
		          <p>FECHA EMISION : '.$fecha.'</p>
		          <!--p>&nbsp;</p-->		         
			</td>
		  </tr>
		  <tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h1>VALE DESPACHO</h1></td>
		  </tr>
		  <tr>
		    <td colspan="3" width="987px" >
		    <table width="987px" border="0">
    		<tr>
			<td width="50px">Sr.(es):</td>
			<td width="395px">'. $row->nom_cliente.'</td>
			<td width="100px">Rut:</td>
			<td width="197px">'. number_format(substr($row->rut_cliente, 0, strlen($row->rut_cliente) - 1),0,".",".")."-".substr($row->rut_cliente,-1).'</td>
		    </tr>
		    <tr>
		    <td width="50px">Direccion</td>
			<td width="100px">'.$direccion.'</td>
			<td width="50px">Comuna</td>
			<td width="100px">'.$comuna.'</td>
			<td width="50px">Ciudad</td>
			<td width="100px">'.$ciudad.'</td>
			</tr>
			 <tr>
		    <td width="150px">Bodega Salida</td>
			<td width="100px">'.$bodegasalida.'</td>
			<td width="150px">Bodega Entrada</td>
			<td width="150px">'.$bodegaentrada.'</td>
			</tr>
			<tr>
		    <td width="150px"></td>
			<td width="100px"></td>
			<td width="150px"></td>
			<td width="150px"></td>
			</tr>
			<tr>
		    <td width="150px">Nombre Retira</td>
			<td width="100px">______________________________________________</td>
			<td width="150px">Nombre Recibe</td>
			<td width="150px">______________________________________________</td>
			</tr>		    	
		    	</table>
			</td>
		  </tr>
		  <tr>
		    <td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" >
		      <tr>
		        <td width="148px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Cantidad</td>
		        <td width="395px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Descripci&oacute;n</td>
		        <td width="148px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Precio/Unidad</td>
		        <td width="148px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Neto</td>
		        <td width="148px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Total</td>
		      </tr>';
		$descripciones = '';
		$i = 0;
		foreach($items->result() as $v){
			//$i = 0;
			//while($i < 30){
			$this->db->where('id', $v->id_producto);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];
			
			$html .= '<tr>
			<td style="text-align:right">'.$v->cantidad.'&nbsp;&nbsp;</td>			
			<td style="text-align:left">'.$producto->nombre.'</td>			
			<td align="right">$ '.number_format($v->valor_unit, 0, '.', ',').'</td>
			<td align="right">$ '.number_format($v->neto - $v->desc, 0, '.', ',').'</td>
			<td align="right">$ '.number_format($v->total, 0, '.', ',').'</td>
			</tr>';
			
			//}
			$i++;
		}

		// RELLENA ESPACIO
		while($i < 30){
			$html .= '<tr><td colspan="5">&nbsp;</td></tr>';
			$i++;
		}


		$html .= '<tr><td colspan="5">&nbsp;</td></tr></table></td>
		  </tr>
		  <tr>
		  	<td colspan="3" style="border-top:1pt solid black;text-align:center;"><p><b>VALORES EN DETALLE NETOS+IVA</b></p></td>
		  </tr>
		  
		  <tr>
		  	<td colspan="2" rowspan="6" style="font-size: 20px;border-bottom:1pt solid black;border-top:1pt solid black;border-left:1pt solid black;border-right:1pt solid black;text-align:left;">

		  	<p>Observacion: '.$observacion.'</p>
		     <!--p>&nbsp;</p-->
		     <!--p>&nbsp;</p-->
		     <p>Nombre: '.$nom_observa.'</p>
		     <!--p>&nbsp;</p-->
		    </td>

		  	<td>
				<table width="296px" border="0">
				<tr>
					<td width="150px" style="font-size: 20px;text-align:left;">Pretotal</td>
					<td width="146px" style="text-align:right;">$ '. number_format($subtotal, 0, '.', ',') .'</td>
				</tr>
				</table>
		  	</td>
		  </tr>
		  <tr>
		  	<td>
				<table width="296px" border="0">
					
				</table>
		  	</td>		  
		  </tr>	
		  <tr>
		  	<td>
				<table width="296px" border="0">
					<tr>
						<td width="150px" style="font-size: 20px;text-align:left;">Neto</td>
						<td width="146px" style="text-align:right;">$ '.number_format($neto, 0, '.', ',').'</td>
					</tr>
				</table>
		  	</td>		  
		  </tr>	
		  <tr>
		  	<td>
				<table width="296px" border="0">
					<tr>
						<td width="150px" style="font-size: 20px;text-align:left;">IVA</td>
						<td width="146px" style="text-align:right;">$ '.number_format($iva, 0, '.', ',').'</td>
					</tr>
				</table>
		  	</td>		  
		  </tr>
		  <tr>
		  	<td>
				<table width="296px" border="0">
					<tr>
						<td width="150px" style="font-size: 20px;text-align:left;">Total</td>
						<td width="146px" style="text-align:right;">$ '. number_format($row->total, 0, '.', ',') .'</td>
					</tr>
				</table>
		  	</td>		  
		  </tr>
		  <tr>
		  	<td>&nbsp;</td>		  
		  </tr>
		  <tr>
		  	<td>&nbsp;</td>		  
		  </tr>		  		  		  	  
		  <tr>
		    <td colspan="2" style="text-align:right;font-style: italic;"><b>EL SERVICIO MARCA LA DIFERENCIA!!!</b></td>
		  </tr>
		  
		</table>
		</body>
		</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================

		//include(dirname(__FILE__)."/../libraries/mpdf60/mpdf.php");

		$this->load->library("mpdf");

		$mpdf= new mPDF(
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
		
		exit;
	}

	public function save(){

		$resp = array();
		$idcliente = $this->input->post('idcliente');
		$numvale = $this->input->post('numerovale');
		$idbodega = $this->input->post('idbodega');
		$idbodega2 = $this->input->post('idbodega2');
		$observacion = $this->input->post('observacion');
		$fechapreventa = $this->input->post('fechapreventa');
		$sucursal = $this->input->post('idsucursal');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('neto');
		$fiva = $this->input->post('iva');
		$fafecto = $this->input->post('afecto');
		$ftotal = $this->input->post('total');
		$observa = $this->input->post('observa');
		$tipodocumento = 6;
				
		$vale = array(
	        'num_vale' => $numvale,
	        'fecha_venta' => $fechapreventa,
	        'id_cliente' => $idcliente,
	        'id_sucursal' => $sucursal,
	        'neto' => $neto,
	        'iva' => $fiva,        
	        'total' => $ftotal,
	        'id_observa' => $observa,
	        'id_bodegasalida' => $idbodega,
	        'id_bodegaentrada' => $idbodega2,
	        'observaciones' => $observacion
		);

		$this->db->insert('vale', $vale); 
		$idvale = $this->db->insert_id();

		$secuencia = 0;

		foreach($items as $v){

			$secuencia = $secuencia + 1;
			$vale_detalle = array(
		        'id_producto' => $v->id_producto,
		        'id_vale' => $idvale,
		        'valor_unit' => $v->precio,
		        'neto' => $v->neto,
		        'cantidad' => $v->cantidad,
		        'neto' => $v->neto,
		        'iva' => $v->iva,
		        'total' => $v->total,
		        'fecha' => $fechapreventa,
		        'secuencia' => $secuencia
			);

		$producto = $v->id_producto;

		$this->db->insert('vale_detalle', $vale_detalle);

		$query = $this->db->query('SELECT * FROM existencia WHERE id_producto='.$producto.' and id_bodega='.$idbodega.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];	
				$saldo = ($row->stock)-($v->cantidad);
				$idexiste = ($row->id);
		        if ($producto==($row->id_producto) and $idbodega==($row->id_bodega)){
				    $datos3 = array(
					'stock' => $saldo,
			        'fecha_ultimo_movimiento' => date('Y-m-d H:i:s')
					);
					$this->db->where('id', $idexiste);
		    	    $this->db->update('existencia', $datos3);
	    	    }else{

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' => $v->cantidad,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
		    	 	}
				}else{					

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' =>  $v->cantidad,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
			    	
				};

		$datos2 = array(
				'num_movimiento' => $numvale,
		        'id_producto' => $v->id_producto,
		        'id_tipo_movimiento' => $tipodocumento,
		        'valor_producto' =>  $v->precio,
		        'cantidad_salida' => $v->cantidad,
		        'id_bodega' => $idbodega,
		        'fecha_movimiento' => $fechapreventa
		);

		$this->db->insert('existencia_detalle', $datos2);

		$query = $this->db->query('SELECT * FROM existencia WHERE id_producto='.$producto.' and id_bodega='.$idbodega2.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];	
				$saldo = ($row->stock)+($v->cantidad);
				$idexiste = ($row->id);
		        if ($producto==($row->id_producto) and $idbodega2==($row->id_bodega)){
				    $datos3 = array(
					'stock' => $saldo,
			        'fecha_ultimo_movimiento' => date('Y-m-d H:i:s')
					);
					$this->db->where('id', $idexiste);
		    	    $this->db->update('existencia', $datos3);
	    	    }else{

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' => $v->cantidad,
			        'id_bodega' => $idbodega2,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
		    	 	}
				}else{					

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' =>  $v->cantidad,
			        'id_bodega' => $idbodega2,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
			    	
				};

		$datos2 = array(
				'num_movimiento' => $numvale,
		        'id_producto' => $v->id_producto,
		        'id_tipo_movimiento' => $tipodocumento,
		        'valor_producto' =>  $v->precio,
		        'cantidad_entrada' => $v->cantidad,
		        'id_bodega' => $idbodega2,
		        'fecha_movimiento' => $fechapreventa
		);

		$this->db->insert('existencia_detalle', $datos2);	
		
		
		}
				
        $resp['success'] = true;
		$resp['idpreventa'] = $idvale;

		$this->Bitacora->logger("I", 'vale', $idvale);
		$this->Bitacora->logger("I", 'vale_detalle', $idvale);        

        echo json_encode($resp);
	}

	public function save3(){

		$resp = array();

		$idcliente = $this->input->post('idcliente');
		$numticket = $this->input->post('numeroticket');
		$idbodega = $this->input->post('idbodega');
		$idtipo = $this->input->post('idtipo');
		$idpago = $this->input->post('idpago');
		$fechapreventa = $this->input->post('fechapreventa');
		$vendedor = $this->input->post('vendedor');
		$sucursal = $this->input->post('sucursal');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('neto');
		$desc = $this->input->post('descuento');
		$fiva = $this->input->post('iva');
		$fafecto = $this->input->post('afecto');
		$ftotal = $this->input->post('total');
		$observa = $this->input->post('observa');

		$datetime = DateTime::createFromFormat('d/m/Y', $fechapreventa);
		$fechapreventa = $datetime->format('Y-m-d');

		$agregaclient = array(
         'id_pago' => $idpago,
    	);

    	$this->db->where('id', $idcliente);

    	$this->db->update('clientes', $agregaclient);

		
		if ($desc){			
			$desc = $this->input->post('descuento');
		}else{
				
			$desc = 0;
		};
		
		$preventa = array(
	        'num_ticket' => $numticket,
	        'fecha_venta' => $fechapreventa,
	        'id_cliente' => $idcliente,	        
	        'id_sucursal' => $sucursal,
	        'id_vendedor' => $vendedor,
	        'neto' => $neto,
	        'id_tip_docu' => $idtipo,
	        'desc' => $desc,
	        'total' => $ftotal,
	        'observaciones' => $observa,
	        'id_bodega' => $idbodega,
		);

		$this->db->insert('preventa', $preventa); 
		$idpreventa = $this->db->insert_id();

		$secuencia = 0;

		foreach($items as $v){

			$secuencia = $secuencia + 1;
			$preventa_detalle = array(
		       'id_producto' => $v->id_producto,
		        'id_ticket' => $idpreventa,
		        'valor_unit' => $v->precio_base,
		        'neto' => $v->neto,
		        'cantidad' => $v->cantidad,
		        'neto' => $v->neto,
		        'iva' => $v->iva,
		        'total' => $v->total,
		        'fecha' => $fechapreventa,
		        'secuencia' => $secuencia,
			);

		$producto = $v->id_producto;

		$this->db->insert('preventa_detalle', $preventa_detalle);

		$query = $this->db->query('SELECT * FROM productos WHERE id="'.$producto.'"');
		 
		 if($query->num_rows()>0){

		 	$row = $query->first_row();
		 	$saldo = ($row->stock)-($v->cantidad); 

		 };

		$datos = array(
         'stock' => $saldo,
    	);

    	$this->db->where('id', $producto);

    	$this->db->update('productos', $datos);
    	
		}
		
        $resp['success'] = true;
		$resp['idpreventa'] = $idpreventa;

		$this->Bitacora->logger("I", 'preventa', $idpreventa);
		$this->Bitacora->logger("I", 'preventa_detalle', $idpreventa);
        

        echo json_encode($resp);
	}

	public function save2(){

		$resp = array();
		$idcliente = $this->input->post('idcliente');
		$numticket = $this->input->post('numeroticket');
		$idticket = $this->input->post('idticket');
		$idbodega = $this->input->post('idbodega');
		$idpreventa = $this->input->post('idticket');
		$idtipo = $this->input->post('idtipo');
		$idpago = $this->input->post('idpago');
	    $fechapreventa = $this->input->post('fechapreventa');
		$vendedor = $this->input->post('vendedor');
		$sucursal = $this->input->post('sucursal');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('neto');
		$id = $this->input->post('id');
		$desc = $this->input->post('descuento');
		$fiva = $this->input->post('iva');
		$fafecto = $this->input->post('afecto');
		$ftotal = $this->input->post('total');
		$observa = $this->input->post('observa');

		$query = $this->db->query('DELETE FROM preventa_detalle WHERE id_ticket = "'.$idticket.'"');

		$secuencia = 0;

		foreach($items as $v){

			$secuencia = $secuencia + 1 ;

			$preventa_detalle = array(
		        'id_producto' => $v->id_producto,
		        'id_ticket' => $idpreventa,
		        'valor_unit' => $v->precio,
		        'neto' => $v->neto,
		        'cantidad' => $v->cantidad,
		        'neto' => $v->neto,
		        'iva' => $v->iva,
		        'total' => $v->total,
		        'fecha' => $fechapreventa,
		        'secuencia' => $secuencia
			);

		$producto = $v->id_producto;

	    $this->db->insert('preventa_detalle', $preventa_detalle);

		$query = $this->db->query('SELECT * FROM productos WHERE id="'.$producto.'"');
		if($query->num_rows()>0){

		 	$row = $query->first_row();
		 	$saldo = ($row->stock)-($v->cantidad); 

		};

		$datos = array(
         'stock' => $saldo,
    	);

    	$this->db->where('id', $producto);

    	$this->db->update('productos', $datos);

    	$resp['detalle'] = false;
    	
		}

		$agregaclient = array(
         'id_pago' => $idpago,
    	);

    	$this->db->where('id', $idcliente);

    	$this->db->update('clientes', $agregaclient);

		
		if ($desc){			
			$desc = $this->input->post('descuento');
		}else{
				
			$desc = 0;
		};

		$query2 = $this->db->query('SELECT * FROM preventa_detalle WHERE id_ticket= '.$idticket.'');

		foreach ($query2->result() as $row1){

			$producto2 = $row1->id_producto;

			$query = $this->db->query('SELECT * FROM productos WHERE id="'.$producto2.'"');
		
			if($query->num_rows()>0){

			 	$row = $query->first_row();
			 	$saldo = ($row->stock)+($row1->cantidad); 

			};

			$datos = array(
	         'stock' => $saldo,
	    	);

	    	$this->db->where('id', $producto2);
	    	$this->db->update('productos', $datos);

		}

		$preventa = array(
	        'num_ticket' => $numticket,
	        'fecha_venta' => $fechapreventa,
	        'id_cliente' => $idcliente,
	        'id_sucursal' => $sucursal,
	        'id_vendedor' => $vendedor,
	        'neto' => $neto,
	        'id_tip_docu' => $idtipo,
	        'desc' => $desc,
	        'total' => $ftotal,
	        'id_observa' => $observa,
	        'id_bodega' => $idbodega,
		);

		$this->db->where('id', $idticket);
		$this->db->update('preventa', $preventa);
		
        $resp['success'] = true;

		$resp['idpreventa'] = $idpreventa;

		$this->Bitacora->logger("I", 'preventa', $idpreventa);
		$this->Bitacora->logger("I", 'preventa_detalle', $idpreventa);        

        echo json_encode($resp);
	}

	public function update(){
		$resp = array();
		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
	        'num_ticket' => $data->num_ticket,
	        'fecha_venta' => $data->fecha_venta,
	        'id_cliente' => $data->id_cliente,
	        'id_sucursal' => $sucursal,
	        'id_vendedor' => $data->id_vendedor,
	        'id_bodega' => $idbodega,
	        'neto' => $data->neto,
	        'desc' => $data->desc,
	        'total' => $data->total
	    );
		$this->db->where('id', $id);
		
		$this->db->update('preventa', $data); 

        $resp['success'] = true;
        $this->Bitacora->logger("M", 'preventa', $id);


        echo json_encode($resp);

	}

	public function getAll(){
		
		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');
        $opcion = $this->input->post('opcion');
        $nombres = $this->input->post('nombre');
        $tipo = $this->input->post('documento');
        $fecha = $this->input->post('fecha');
        $idbodega = $this->input->post('bodega');

        if(!$idbodega){
        	$idbodega=1;
        };
        if(!$fecha){
         $fecha = date('Y-m-d');
        };
        $estado = "";
        
		if($opcion == "Rut"){

			
			$data = array();		
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente FROM vale acc
			left join clientes c on (acc.id_cliente = c.id)
			WHERE c.rut = "'.$nombres.'" and acc.estado = "'.$estado.'"
			order by acc.id desc');

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

	    }else if($opcion == "Nombre"){

	    	
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "c.nombres like '%".$nombre."%' ";
	        }

	        $data = array();	        	    	
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente FROM vale acc
			left join clientes c on (acc.id_cliente = c.id)
			WHERE ' . $sql_nombre . ' and acc.estado = "'.$estado.'"
			order by acc.id desc'
						
			);

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	 
		}else if($opcion == "Todos"){

			$data = array();
			
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente FROM vale acc
			left join clientes c on (acc.id_cliente = c.id)
			WHERE acc.estado = "'.$estado.'" and acc.id_bodegasalida = "'.$idbodega.'"
			');

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente FROM vale acc
			left join clientes c on (acc.id_cliente = c.id)
			WHERE acc.estado = "'.$estado.'" and acc.id_bodegasalida = "'.$idbodega.'"
			order by acc.id desc
			limit '.$start.', '.$limit.'');
	

		}else if($opcion == "Numero"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente FROM vale acc
			left join clientes c on (acc.id_cliente = c.id)
			WHERE acc.num_vale = "'.$nombres.'" 
			order by acc.id desc'	
			
			);

			$total = 0;

		 	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		}else{
			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente FROM vale acc
			left join clientes c on (acc.id_cliente = c.id)
			WHERE acc.id_bodegasalida = "'.$idbodega.'" 
			order by acc.id desc');

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente FROM vale acc
			left join clientes c on (acc.id_cliente = c.id)
			WHERE acc.id_bodegasalida = "'.$idbodega.'" 
			order by acc.id desc
			limit '.$start.', '.$limit.'');	

		}

		if($query->num_rows()>0){

		foreach ($query->result() as $row)
		{
			$rutautoriza = $row->rut_cliente;
		   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		   
		    };

		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };

		   if (strlen($rutautoriza) == 7){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $row->rut_cliente = ($ruta3.".".$ruta2."-".$ruta1);
		     
		    };
		    
		    
		    if (strlen($rutautoriza) == 4){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };	


		    if (strlen($rutautoriza) == 6){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -6, 2);
		      $row->rut_cliente = ($ruta3.".".$ruta2."-".$ruta1);
		     
		    };
		    
			$data[] = $row;
		}
	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;
        $resp['fecha'] = $fecha;

        echo json_encode($resp);
	}
}
