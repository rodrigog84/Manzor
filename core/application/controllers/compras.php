<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Compras extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}

	public function validanumero(){

		$resp = array();
	    $numfact = $this->input->post('numfactura');
	    $idproveedor = $this->input->post('idproveedor');

	    $query = $this->db->query('SELECT * FROM factura_compras
	    WHERE id_proveedor='.$idproveedor.' and num_factura='.$numfact.'');

	    if ($query->num_rows()>0){
	     $resp['success'] = true;
	    };	   
	    
	    echo json_encode($resp);	  	

	}

	public function elimina2(){

	    $resp = array();
	    $idcliente = $this->input->post('idcliente');
	    $idbodega = $this->input->post('bodega');


        $items = $this->db->get_where('factura_compras', array('id' => $idcliente));

	    if($items->num_rows()>0){

	     
	   	 	$items = $this->db->get_where('detalle_factura_compra', array('id_factura' => $idcliente));

	   	 if($items->num_rows()>0){

	   	 	$users = $items->result_array();
		    foreach($users as $v){

		    	$producto = $v['id_producto'];
		    	$cantidad = $v['cantidad'];
		    	$numfactura = $v['num_factura'];
		    	$precio = $v['precio'];
		    	$query = $this->db->query('SELECT * FROM existencia
		    	WHERE id_producto='.$producto.' and id_bodega='.$idbodega.'');
	    	 	$row = $query->result();
				if ($query->num_rows()>0){
				$row = $row[0];
				if (($row->stock)<0){
				    $saldo = ($row->stock)+($cantidad);
			    }else{
			    	$saldo = ($row->stock)-($cantidad);			    	
			    };
				$idexiste = ($row->id);
		        if ($producto==($row->id_producto) and $idbodega==($row->id_bodega)){
				    $datos3 = array(
					'stock' => $saldo,
			        'fecha_ultimo_movimiento' => date('Y-m-d H:i:s')
					);
					$this->db->where('id', $idexiste);
		    	    $this->db->update('existencia', $datos3);
	    	    }

	    	    $datos2 = array(
						'num_movimiento' => $numfactura,
				        'id_producto' => $producto,
				        'id_tipo_movimiento' => 4,
				        'valor_producto' =>  $precio,
				        'cantidad_salida' => $cantidad,
				        'id_bodega' => $idbodega,
				        'fecha_movimiento' => date('Y-m-d H:i:s')
				);

				$this->db->insert('existencia_detalle', $datos2);

	    	

	        }
	       };

	   	 	$query = $this->db->query('DELETE FROM factura_compras WHERE id = "'.$idcliente.'"
	   	 	');

	   	 	$query = $this->db->query('DELETE FROM detalle_factura_compra WHERE id_factura = "'.$idcliente.'"');


   	
	    	$resp['success'] = true;

	    }else{

	    	$query = $this->db->query('DELETE FROM factura_compras WHERE id = "'.$idcliente.'"
	   	 	');

	    	$query = $this->db->query('DELETE FROM detalle_factura_glosa_compras WHERE id_factura = "'.$idcliente.'"');

	    	$resp['success'] = true;

	    	

	    }

	   	 }else{

	   	 	$resp['success'] = false;
	   	 	

	   	 };	  
	   
	    
	    echo json_encode($resp);	   

	}

	public function exportarPdflibroFacturas()
         {            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 1;
            $tipo2 = 2;
            $tipo3 = 3;
            $tipo4 = 4;
            $this->load->library("mpdf");

			$this->mpdf->mPDF(
				'',    // mode - default ''
				'',    // format - A4, for example, default ''
				8,     // font size - default 0
				'',    // default font family
				10,    // margin_left
				5,    // margin right
				16,    // margin top
				16,    // margin bottom
				9,     // margin header
				9,     // margin footer
				'L'    // L - landscape, P - portrait
				);  
			//echo $html; exit
            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
                          
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_compras acc
                left join clientes c on (acc.id_proveedor = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.tipo_documento and acc.fecha_factura' 
                
                );
            

              };


		$header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Libro de Compras/title>
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
		          <p>FECHA EMISION : '.date('d/m/Y').'</p>
			</td>
		  </tr>';              
              
		  $header2 = '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>LIBRO DE COMPRAS</h2></td>
		  </tr>
			<tr><td colspan="3">&nbsp;</td></tr>		  
			';              


		$body_header = '<tr>
		    <td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" >
		      <tr>
		        <td width="57"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Dia</td>
		        <td width="40px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Num</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Tipo</td>
		        <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Rut</td>
		        <td width="350px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Nombre</td>
		        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ></td>
		        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Exento</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Neto</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >IVA</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Total</td>
		      </tr>';
		      $sub_total = 0;
		      $descuento = 0;
		      $neto = 0;
		      $iva = 0;
		      $cantfact = 0;
		      $cantnc =0;
		      $totalfactura = 0;
              $i = 0;
              $body_detail = '';
              $users = $query->result_array();
		      foreach($users as $v){

		      	    list($anio, $mes, $dia) = explode("-",$v['fecha_factura']);
                    $rutautoriza = $v['rut_cliente'];
				   	if (strlen($rutautoriza) == 8){
				      $ruta1 = substr($rutautoriza, -1);
				      $ruta2 = substr($rutautoriza, -4, 3);
				      $ruta3 = substr($rutautoriza, -7, 3);
				      $ruta4 = substr($rutautoriza, -8, 1);
				      $v['rut_cliente'] = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
				    };
				    if (strlen($rutautoriza) == 9){
				      $ruta1 = substr($rutautoriza, -1);
				      $ruta2 = substr($rutautoriza, -4, 3);
				      $ruta3 = substr($rutautoriza, -7, 3);
				      $ruta4 = substr($rutautoriza, -9, 2);
				      $v['rut_cliente'] = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);			   
				    };
				    if (strlen($rutautoriza) == 2){
				      $ruta1 = substr($rutautoriza, -1);
				      $ruta2 = substr($rutautoriza, -4, 1);
				      $v['rut_cliente'] = ($ruta2."-".$ruta1);
				      				     
				    };

				    if ($v['tipo_documento'] == 5){

				    	$v['neto'] = ($v['neto']/-1);
				    	$v['iva'] = ($v['iva']/-1);
				    	$v['totalfactura'] = ($v['totalfactura']/-1);
				    	$tipo="N/C";

				    };
				     if ($v['tipo_documento'] == 1 or $v['tipo_documento'] == 2){
				      $sub_total += $v['sub_total'];
				      $descuento += $v['descuento'];
				      $neto += $v['neto'];
				      $iva += $v['iva'];
				      $totalfactura += $v['totalfactura'];
				      $cantfact++;
				      $tipo="Fact";
				      };

				       
			      if ($v['tipo_documento'] == 3){
			      $netoex += $v['neto'];
			      $ivaex += $v['iva'];
			      $totalfacturaex += $v['totalfactura'];
			      $cantex++;
			      $tipo="F/Exe";
			      };
			      if ($v['tipo_documento'] == 4){
			      $netond += $v['neto'];
			      $ivand += $v['iva'];
			      $totalfacturand += $v['totalfactura'];
			      $cantnd++;
			      $tipo="N/D";
			      };
			      if ($v['tipo_documento'] == 5){
			      $netonc += $v['neto'];
			      $ivanc += $v['iva'];
			      $totalfacturanc += $v['totalfactura'];
			      $cantnc++;
			      };
				    	      	    

					$body_detail .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<table width="997" cellspacing="0" cellpadding="0" >
				    <tr>				
					<td width="47px" style="text-align:left">'.$dia.'</td>
					<td width="70px" style="text-align:left">'.$v['num_factura'].'</td>
					<td width="70px" style="text-align:left">'.$tipo.'</td>
					<td width="100px" style="text-align:right">'.$v['rut_cliente'].'</td>
					<td width="10px" style="text-align:left"></td>
					<td width="350px" style="text-align:left">'.$v['nombre_cliente'].'</td>
					<td width="50px" style="text-align:left"></td>
					<td width="100px" style="text-align:right">$ '.number_format($v['neto'], 0, '.', ',').'</td>
					<td width="100px" style="text-align:right">$ '.number_format($v['iva'], 0, '.', ',').'</td>
					<td width="100px" style="text-align:right">$ '.number_format($v['totalfactura'], 0, '.', ',').'</td>
				    </tr>
				    </table>
				  </tr>';
					
			      
                 


		            $i++;
		         }  

				$footer .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
				        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($neto, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($iva, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfactura, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Facturas</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantfact, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($neto, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($iva, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfactura, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:0pt solid black;border-top:0pt solid black;text-align:left;font-size: 14px;" ><b></b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Facturas Excentas</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantex, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($netoex, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($ivaex, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfacturaex, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:0pt solid black;border-top:0pt solid black;text-align:left;font-size: 14px;" ><b></b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Notas Debito</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantnd, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($netond, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($ivand, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfacturand, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				         <td width="477px"  style="border-bottom:0pt solid black;border-top:0pt solid black;text-align:left;font-size: 14px;" ><b></b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Notas de Ctredito</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantnc, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($netonc, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($ivanc, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfacturanc, 0, ',', '.').'</b></td>
				      </tr>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				</body>
				</html>';		              
             
        			  
	        $html = $header.$header2;
	        $html2 =$body_header.$body_detail.$footer;
	      	$this->mpdf->WriteHTML($html);
			$this->mpdf->WriteHTML($html2);
			$this->mpdf->Output("LibroCompras.pdf", "I");
            exit;		          

        }

        public function exportarPdfFacturas()
         {

            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            $nombres = $this->input->get('nombre');
            $opcion = $this->input->get('opcion');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 1;
            $tipo2 = 2;
            $tipo3 = 3;
            $tipo4 = 4;
                        

            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
            if($opcion == "Rut"){
    
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_compras acc
                left join clientes c on (acc.id_proveedores = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and c.rut = '.$nombres.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc'    

              );

                }else if($opcion == "Nombre"){

                  
                $sql_nombre = "";
                    $arrayNombre =  explode(" ",$nombres);

                    foreach ($arrayNombre as $nombre) {
                      $sql_nombre .= "and c.nombres like '%".$nombre."%' ";
                    }
                            
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_compras acc
                left join clientes c on (acc.id_proveedores = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') ' . $sql_nombre . ' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'" 
                order by acc.id desc' 
                
                );
             
              }else if($opcion == "Todos"){

                
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_compras acc
                left join clientes c on (acc.id_proveedores = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 
                
                );
            

              }else{

                
              $data = array();
              $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_compras acc
                left join clientes c on (acc.id_proveedores = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 

                );


              }

            };
		$header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Untitled Document</title>
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
		          <p>FECHA EMISION : '.date('d/m/Y').'</p>
			</td>
		  </tr>';              
              
		  $header2 = '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>LIBRO DE COMPRAS</h2></td>
		  </tr>
			<tr><td colspan="3">&nbsp;</td></tr>		  
			';              


		$body_header = '<tr>
		    <td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" border="0">
		      <tr>
		      	<td width="55px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Id</td>
		        <td width="62px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Numero</td>
		        <td width="65px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Fecha</td>
		        <td width="65px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Vencimiento</td>
		        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Rut</td>
		        <td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Nombre</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Vendedor</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Afecto</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Descuento</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Neto</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >IVA</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Total</td>
		      </tr>';


		      $sub_total = 0;
		      $descuento = 0;
		      $neto = 0;
		      $iva = 0;
		      $totalfactura = 0;
              $i = 0;
              $body_detail = '';
              $users = $query->result_array();
		      foreach($users as $v){

					$body_detail .= '<tr>
					<td style="text-align:left;font-size: 14px;">'.$v['id'].'</td>		
					<td style="text-align:left;font-size: 14px;">'.$v['num_factura'].'</td>			
					<td style="text-align:left;font-size: 14px;">'.$v['fecha_factura'].'</td>
					<td style="text-align:right;font-size: 14px;">'.$v['fecha_venc'].'</td>
					<td style="text-align:center;font-size: 14px;">'.$v['rut_cliente'].'</td>
					<td style="text-align:left;font-size: 14px;">'.$v['nombre_cliente'].'</td>
					<td style="text-align:left;font-size: 14px;">'.$v['nom_vendedor'].'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['sub_total'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['descuento'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['neto'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['iva'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['totalfactura'], 0, '.', ',').'</td>
					</tr>';
					
			      $sub_total += $v['sub_total'];
			      $descuento += $v['descuento'];
			      $neto += $v['neto'];
			      $iva += $v['iva'];
			      $totalfactura += $v['totalfactura'];

		            $i++;
		         }  

				$footer .= '<tr><td colspan="12">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" border="0">
				      <tr>
				        <td width="635px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($sub_total, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($descuento, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($neto, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($iva, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfactura, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				</body>
				</html>';		              
             
        $html = $header.$header2.$body_header.$body_detail.$footer;
        //echo $html; exit;
        //$html = $header.$header2.$body_header.$body_detail.$spaces;
			$this->load->library("mpdf");
			//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
			//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

			$this->mpdf->mPDF(
				'',    // mode - default ''
				'',    // format - A4, for example, default ''
				8,     // font size - default 0
				'',    // default font family
				10,    // margin_left
				5,    // margin right
				16,    // margin top
				16,    // margin bottom
				9,     // margin header
				9,     // margin footer
				'L'    // L - landscape, P - portrait
				);  
			//echo $html; exit;
			$this->mpdf->WriteHTML($html);
			$this->mpdf->Output("Compras.pdf", "I");

			exit;            

        }


	public function anulacion(){

		$resp = array();		
        $idfactura = $this->input->get('idfactura');
        $idbodega=1;
        $tipodocumento=24;
        
        $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
		left join clientes c on (acc.id_proveedor = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		WHERE acc.id = '.$idfactura.'');
		if($query->num_rows()>0){
	 		$row = $query->first_row();
	 	    $forma = ($row->forma);
	 	    $numfactura= $row->num_factura;
	 	    $idcliente = $row->id_proveedor;

	 	    $recauda = $this->db->query('SELECT * FROM recaudacion 
			WHERE num_doc = '.$numfactura.' and id_proveedor = '.$idcliente.' ');
			
			if($recauda->num_rows()>0){
				$row = $recauda->first_row();
	   			$id = $row->id;

	   			$nulos = array(
				'estado' => "NUL"	        
				);
				$this->db->where('id_recaudacion', $id);	  
			    $this->db->update('recaudacion_detalle', $nulos);

			    $this->db->where('id_recaudacion', $id);	  
			    $this->db->update('recaudacion_general', $nulos);
	   		};

	 	    $factura_cliente = array(
			'estado' => "NO"	        
			);
			$this->db->where('id', $idfactura);	  
		    $this->db->update('factura_compras', $factura_cliente);

		    $items = $this->db->get_where('detalle_factura_compra', array('id_factura' => $idfactura));

		    foreach($items->result() as $v){

	    	$producto=$v->id_producto;
	    	$query = $this->db->query('SELECT * FROM existencia 
	    	WHERE id_producto='.$producto.' and id_bodega='.$idbodega.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];	
				$saldo = ($row->stock)+($v->cantidad);
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
						'num_movimiento' => $numfactura,
				        'id_producto' => $v->id_producto,
				        'id_tipo_movimiento' => $tipodocumento,
				        'valor_producto' =>  $v->precio,
				        'cantidad_entrada' => $v->cantidad,
				        'id_bodega' => $idbodega,
				        'fecha_movimiento' => date('Y-m-d H:i:s')
				);

				$this->db->insert('existencia_detalle', $datos2);
		    }
	 	    
	 	};

	 	$resp['success'] = true;
        echo json_encode($resp);
	 	
	 	 
		

	}

	public function getAlldespachaproductos(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $codigo = $this->input->get('codigo');        
        $tipo = "1";
        $tipo2 = "101";
        $tipo3 = "103";
		$countAll = $this->db->count_all_results("detalle_factura_compra");
		$data = array();
		if($nombre){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
		left join clientes c on (acc.id_proveedor = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		WHERE acc.id = '.$nombre.' AND acc.tipo_documento in ("'.$tipo.'","'.$tipo2.'","'.$tipo3.'")');
		if($query->num_rows()>0){
	 		$row = $query->first_row();
	 	    $forma = ($row->forma);
	 	    if ($forma==1 or $forma==2){
	 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
	 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
	   		  	FROM detalle_factura_compra acc    
	   		  	left join productos p on (acc.id_producto = p.id)
				WHERE acc.id_despacho = "'.$nombre.'"');
			}else{
	 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
	 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
	   		  	FROM detalle_factura_compra acc    
	   		  	left join productos p on (acc.id_producto = p.id)
				WHERE acc.id_factura = "'.$nombre.'"'
			    );		 	        
	 	    }	 	

		 };
		    
		    $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{			
			$data[] = $row;
		}

	    }else{
	    	$sql_nombre = "";
	        $arrayNombre =  explode(" ",$codigo);
	        foreach ($arrayNombre as $codigo) {
	        	$sql_nombre .= "acc.nombre like '%".$codigo."%' and ";
	        }
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia,
			acc.id as id_producto FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE ' . $sql_nombre . ' 1 = 1');		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{
			
			$data[] = $row;
		}

	    	

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function update(){

		$resp = array();
		$idcliente = $this->input->post('idcliente');
		$numfactura = $this->input->post('numfactura');
		$idfactura = $this->input->post('idfactura');
		$fechafactura = $this->input->post('fechafactura');
		$fechavenc = $this->input->post('fechavenc');
		$vendedor = $this->input->post('vendedor');
		$sucursal = $this->input->post('sucursal');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('netofactura');
		$iva = $this->input->post('ivafactura');
		$afecto = $this->input->post('afectofactura');
		$total = $this->input->post('totalfacturas');
		$totalant = $this->input->post('totalant');
		$tipodocumento = $this->input->post('tipodocumento');
						
		$factura_cliente = array(

			'sub_total' => $neto,
	        'neto' => $neto,
	        'iva' => $iva,
	        'totalfactura' => $total,
	        
		);

		$this->db->where('id', $idfactura);	  
	    $this->db->update('factura_compras', $factura_cliente);

	    $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = 'FACTURAS POR COBRAR'");
		 $row = $query->result();
		 $row = $row[0];
		 $idcuentacontable = $row->idcuentacontable;	


			// VERIFICAR SI CLIENTE YA TIENE CUENTA CORRIENTE
		 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
		 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "'");
    	 $row = $query->result();
	
		if ($query->num_rows()>0){	
			
			$row = $row[0];
			$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo - " . $totalant . " where id = " .  $row->idcuentacorriente );
			$idcuentacorriente =  $row->idcuentacorriente;

			$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo + " . $total . " where id = " .  $row->idcuentacorriente );
			$idcuentacorriente =  $row->idcuentacorriente;
		}

		$query = $this->db->query("UPDATE detalle_cuenta_corriente SET saldo = ".$total." where numdocumento = '".$numfactura."'");
        
        //if ($query->num_rows()>0){

        //	$resp['idctacte'] = $idcuentacorriente;

        //}


		$query = $this->db->query("UPDATE cartola_cuenta_corriente SET valor = ".$total." where numdocumento = '".$numfactura."'");

		//if ($query->num_rows()>0){

        //	$resp['numfactura'] = $numfactura;

        //}
		
			
		/*****************************************/
      

		$this->Bitacora->logger("I", 'factura_compras', $idfactura);


	    $resp['success'] = true;
		$resp['idfactura'] = $idfactura;
		
		
        echo json_encode($resp);

	}

	public function calculofechas(){

		$resp = array();
		$factura = $this->input->post('dias');
		$fechafactura = $this->input->post('fechafactura');

		$fechafactura = substr($fechafactura,0,10);
		$fecha= strtotime("+ $factura days", strtotime ($fechafactura));
		
		$fecha = date('Y-m-d',$fecha);
		
	    $resp['success'] = true;
        $resp['fecha_final'] = $fecha;
        
        echo json_encode($resp);   
	
	}
	
	public function getAll(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $opcion = $this->input->get('opcion');
        $nombres = $this->input->get('nombre');
        $tipo = $this->input->get('documento');
        if (!$tipo){
	       $sql_tipo_documento = "";
	    }else{
	       $sql_tipo_documento = "acc.tipo_documento = " . $tipo . " and ";
	    }

        //$countAll = $this->db->count_all_results("factura_compras");

        $data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' 1 = 1'			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	
	       if($opcion == "Rut"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' c.rut = "'.$nombres.'"');

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' c.rut = "'.$nombres.'"
			order by acc.id desc
			limit '.$start.', '.$limit.''		 
		);


	    }else if($opcion == "Nombre"){

	    	
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "c.nombres like '%".$nombre."%' and ";
	        }
	        	    	
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . '  ' . $sql_nombre . ' 1 = 1'
			);

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . '  ' . $sql_nombre . ' 1 = 1
			order by acc.id desc
			limit '.$start.', '.$limit.''		 
						
			);
	 
		}else if($opcion == "Todos"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' 1 = 1
			order by acc.id desc
			limit '.$start.', '.$limit.''	
			
			);	

		}else if($opcion == "Numero"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' acc.num_factura = "'.$nombres.'" ');

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' acc.num_factura = "'.$nombres.'" order by acc.id desc
			limit '.$start.', '.$limit.''		 
		);

	    }else{

			
		$data = array();
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu, td.descripcion as tipo_doc	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE  acc.estado="" AND ' . $sql_tipo_documento . '  1 = 1 
			order by acc.id desc		
			limit '.$start.', '.$limit.''
			);
		}
		
		
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
		    $total = $total +1;
			
		 
			$data[] = $row;
		}

		//$countAll = $total;
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAll2(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $opcion = $this->input->get('opcion');
        $nombres = $this->input->get('nombre');
        $tipo = 1;
        $tipo2 = 2;
        $tipo3 = 19;
        $estado = "";

        $countAll = $this->db->count_all_results("factura_compras");
		$data = array();
		$total = 0;
	

        if($opcion == "Rut"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') and c.rut = '.$nombres.'
			order by acc.id desc		
			limit '.$start.', '.$limit.''		 

		);

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
	        	$sql_nombre .= "and c.nombres like '%".$nombre."%' ";
	        }
	        	    	
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') ' . $sql_nombre . '
			order by acc.id desc		
			limit '.$start.', '.$limit.''
						
			);

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	 
		}else if($opcion == "Todos"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') and acc.estado = "'.$estado.'" order by acc.id desc'	
			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		}else{

			
		$data = array();
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') and acc.estado = "'.$estado.'" order by acc.id desc		
			limit '.$start.', '.$limit.''	

			);


		}		
		
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
		    $total = $total +1;
			
		 
			$data[] = $row;
		}

		//$countAll = $total;
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAllnotap(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $codigo = $this->input->get('codigo');        
        $tipo = "1";
        $tipo4 = "2";
        $tipo2 = "101";
        $tipo3 = "103";        


		$countAll = $this->db->count_all_results("detalle_factura_compra");
		$data = array();

		if($nombre){

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id = '.$nombre.' AND acc.tipo_documento in ("'.$tipo.'","'.$tipo2.'","'.$tipo3.'","'.$tipo4.'")');

			if($query->num_rows()>0){

		 		$row = $query->first_row();

		 	    $forma = ($row->forma);

		 	    if ($forma==1 or $forma==2){

		 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
		 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
		   		  	FROM detalle_factura_compra acc    
		   		  	left join productos p on (acc.id_producto = p.id)
					WHERE acc.id_despacho = "'.$nombre.'"');

		 	    	

		 	    }else{

		 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
		 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
		   		  	FROM detalle_factura_compra acc    
		   		  	left join productos p on (acc.id_producto = p.id)
					WHERE acc.id_factura = "'.$nombre.'"'
				    );

		 	        
		 	    }
		 	

		    };
		    
		    $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{
			
			$data[] = $row;
		}

	    }else{

	    	$sql_nombre = "";
	        $arrayNombre =  explode(" ",$codigo);

	        foreach ($arrayNombre as $codigo) {
	        	$sql_nombre .= "acc.nombre like '%".$codigo."%' and ";
	        }

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia,
			acc.id as id_producto FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE ' . $sql_nombre . ' 1 = 1');

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{
			
			$data[] = $row;
		}

	    	

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAllfacturasdirectas(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $opcion = $this->input->get('opcion');        
            
        $tipo = "1";
        $tipo2 = "101";


		$countAll = $this->db->count_all_results("factura_compras");
		$data = array();

		if($opcion=="Nombre"){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_proveedor = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.')
			limit '.$start.', '.$limit.' ');

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
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


		 
			$data[] = $row;
		}

	    }else if($opcion=="Numero"){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.num_factura = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.')
			limit '.$start.', '.$limit.' ');

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
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


		 
			$data[] = $row;
		}

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAlldespachafactura(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');        
        $tipo = "1";
        $tipo2 = "101";


		$countAll = $this->db->count_all_results("factura_compras");
		$data = array();

		if($nombre){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_proveedor = '.$nombre.' AND acc.tipo_documento = '.$tipo.'
			limit '.$start.', '.$limit.' ' 

		);

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
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


		 
			$data[] = $row;
		}

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAllfact(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $opcion = $this->input->get('opcion');
        
        if(!$opcion){
        	$opcion="Nombre";
        } 
             
        $tipo = "1";
        $tipo2 = "101";
        $tipo3 = "2";// FACTURA ELECTRONICA


		$countAll = $this->db->count_all_results("factura_compras");
		$data = array();

		if($opcion=="Nombre"){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_factura = '.$nombre.' acc.tipo_documento in ('.$tipo.','.$tipo2.','.$tipo3.')');
		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
	    }else if($opcion=="Numero"){
	
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.num_factura = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.','.$tipo3.')' 	);

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


	    }if($opcion=="Cliente"){
	
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_compras acc
			left join clientes c on (acc.id_proveedor = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_proveedor = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.','.$tipo3.')');

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


	    }	    
		
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


		 
			$data[] = $row;
		}

	   
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}


	public function save(){
		
		$resp = array();
		$idcliente = $this->input->post('idcliente');
		$numfactura = $this->input->post('numfactura');
		$idticket = $this->input->post('idticket');
		$idfactura = $this->input->post('idfactura');
		$fechafactura = $this->input->post('fechafactura');
		$fechavenc = $this->input->post('fechavenc');
		$vendedor = $this->input->post('vendedor');
		$sucursal = $this->input->post('sucursal');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('netofactura');
		$formadepago = $this->input->post('formadepago');
		$fiva = $this->input->post('ivafactura');
		$fafecto = $this->input->post('afectofactura');
		$ftotal = $this->input->post('totalfacturas');
		$tipodocumento = $this->input->post('tipodocumento');
		$idbodega = 1;
		
		$data3 = array(
	         'correlativo' => $numfactura
	    );
	    $this->db->where('id', $tipodocumento);
	  
	    $this->db->update('correlativos', $data3);
			
		$factura_cliente = array(
			'tipo_documento' => $tipodocumento,
	        'id_proveedor' => $idcliente,
	        'num_factura' => $numfactura,
	        'id_vendedor' => $vendedor,
	        'id_sucursal' => $sucursal,
	        'id_cond_venta' => $formadepago,
	        'sub_total' => $neto,
	        'descuento' => ($neto - $fafecto),
	        'neto' => $neto,
	        'iva' => $fiva,
	        'totalfactura' => $ftotal,
	        'fecha_factura' => $fechafactura,
	        'fecha_venc' => $fechavenc
	          
		);

		$this->db->insert('factura_compras', $factura_cliente); 
		$idfactura = $this->db->insert_id();

	    $secuencia = 0;

		foreach($items as $v){
			$factura_compras_item = array(
		        'id_producto' => $v->id_producto,
		        'id_factura' => $idfactura,
		        'num_factura' => $numfactura,
		        'precio' => $v->precio,
		        'cantidad' => $v->cantidad,
		        'neto' => $v->total,
		        'descuento' => $v->dcto,
		        'iva' => $v->iva,
		        'totalproducto' => $v->total,
		        'fecha' => $fechafactura
			);

		$producto = $v->id_producto;
	    $puc = ($v->precio / 1.19);
	    $cero=0;
		
		   $query = $this->db->query('SELECT * FROM productos WHERE id="'.$producto.'"');
		   if($query->num_rows()>0){
			 $row = $query->first_row();
			 $query2 = $this->db->query('SELECT * FROM existencia_detalle WHERE id_producto='.$producto.' and cantidad_entrada > '.$cero.'');	    	 
	    	 $ppm=0;
	    	 $cal = 1;
			 if ($query2->num_rows()>0){
			 	foreach ($query2->result() as $r){			 	
				 	$ppm = $ppm + ($v->precio);
				 	$cal = $cal +1;
			    };
			    $ppm = $ppm + $puc;
                $ppm = ($ppm / $cal);
			 	$saldo = ($row->stock)+($v->stock);
			 	$pmc = ($row->p_may_compra);
			 	if ($pmc < $puc){			 		
			 		$pmc = $puc;
			 	};			 
			}else{

			    $ppm = $v->precio;
                $ppm = $v->precio;
			 	$saldo =  $v->cantidad;
			 	$pmc = $v->precio;
			 };                
		   };
		   $prod = array(
	         'stock' => $saldo,
	         'p_ult_compra' => $puc,
	         'p_may_compra' => $pmc,
	         'p_promedio' => $ppm,
	         'fecha_ult_compra' => $fechafactura
	         
	    	);

	    	$this->db->where('id', $producto);

	    	$this->db->update('productos', $prod);


		$this->db->insert('detalle_factura_compra', $factura_compras_item);

		$query = $this->db->query('SELECT * FROM productos WHERE id="'.$producto.'"');
		if($query->num_rows()>0){
		 	$row = $query->first_row();
		 	$saldo = ($row->stock)+($v->cantidad);
		};

		 $query = $this->db->query('SELECT * FROM existencia WHERE id_producto='.$producto.' and id_bodega='.$idbodega.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];
				$saldo = ($row->stock)+($v->cantidad);
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
				'num_movimiento' => $numfactura,
		        'id_producto' => $v->id_producto,
		        'id_tipo_movimiento' => $tipodocumento,
		        'valor_producto' =>  $v->precio,
		        'cantidad_entrada' => $v->cantidad,
		        'id_bodega' => $idbodega,
		        'fecha_movimiento' => $fechafactura
		);

		$this->db->insert('existencia_detalle', $datos2);
		
		}
    	
        $resp['success'] = true;
		$resp['idfactura'] = $idfactura;

		$this->Bitacora->logger("I", 'factura_compras', $idfactura);       	
	
		if ($tipodocumento != 3 && $tipodocumento != 105){


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
		        'fechaactualiza' => $fechafactura
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
	        'numdocumento' => $numfactura,
	        'saldoinicial' => $ftotal,
	        'saldo' => $ftotal,
	        'fechavencimiento' => $fechavenc,
	        'fecha' => $fechafactura
		);

		$this->db->insert('detalle_cuenta_corriente', $detalle_cuenta_corriente); 	


		$cartola_cuenta_corriente = array(
	        'idctacte' => $idcuentacorriente,
	        'idcuenta' => $idcuentacontable,
	        'tipodocumento' => $tipodocumento,
	        'numdocumento' => $numfactura,
	        'glosa' => 'Registro de Factura en Cuenta Corriente',
	        'fecvencimiento' => $fechavenc,
	        'valor' => $ftotal,
	        'origen' => 'VENTA',
	        'fecha' => $fechafactura
		);

		$this->db->insert('cartola_cuenta_corriente', $cartola_cuenta_corriente); 			


		}		

		
        echo json_encode($resp);
	}


	public function exportPDF(){

		$idfactura = $this->input->get('idfactura');
		$numero = $this->input->get('numfactura');
		$cabecera = $this->db->get_where('factura_compras', array('id' => $idfactura));	
		$tipodocumento = 1;
		foreach($cabecera->result() as $v){  
				$tipodocumento = $v->tipo_documento; 
		}

		if($tipodocumento == 1){
				$this->exportFacturaPDF($idfactura,$numero);

		}else if($tipodocumento ==  101 || $tipodocumento == 103 || $tipodocumento == 105){ // FACTURA ELECTRONICA O FACTURA EXENTA ELECTRONCA O GUIA DE DESPACHO
				//$es_cedible = is_null($cedible) ? false : true;
				$this->exportFacturaPDF($idfactura,$numero);


		}else{

				$this->exportBoletaPDF($idfactura,$numero);

		}

	}

	//$idfactura,$numero

	public function exportFacturaPDF($idfactura,$numero){

		//$idfactura = $this->input->get('idfactura');
		//$numero = $this->input->get('numfactura');

        if ($idfactura){
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_compras acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = ma.id)
			left join ciudad sa on (cs.id_ciudad = sa.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.id = '.$idfactura.'');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_compras acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = ma.id)
			left join ciudad s on (c.id_ciudad = sa.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = m.id)
			left join ciudad sa on (cs.id_ciudad = s.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.num_factura = '.$numero.'

		');


		}

		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		$fecha = $row->fecha_venc;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);

		if ($row->forma == 0){		 
		//items
		$items = $this->db->get_where('detalle_factura_compra', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$observacion = $row->observacion;
		$rut_cliente = $row->rut_cliente;
		$rut_obs = $row->rut_obs;
		$nom_obs = $row->nom_observ;
		if ($row->direc_sucursal){
			$direccion = $row->direc_sucursal;
			$comuna = $row->com_sucursal;
			$ciudad = $row->ciu_sucursal;	
		}else{
			$direccion = $row->direccion;
			$comuna = $row->nombre_comuna;
			$ciudad = $row->nombre_ciudad;
	    };
		$fecha = $row->fecha_venc;
		$giro = $row->giro;
		$fono = $row->fono;
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale <br> ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_compras', array('id' => $row->id));		
		$forma_pago = $row->cond_pago;
		$montoNeto = 0;
	    $ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoAfecto = $reg->sub_total;
			$montoDescuento = $reg->descuento;
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
   <table width="987px" border="0">
   	 
      <tr>
      	<td width="250px"  height="110px">&nbsp;</td>
        <td width="408px"  height="110px" style="font-size: 20px;vertical-align:bottom;">&nbsp;'. $dia2 . '&nbsp;&nbsp;&nbsp;&nbsp;'.$mes2.'&nbsp;&nbsp;&nbsp;&nbsp;'.$anio2.'</td>
        <td width="329px"  height="110px" >
        <table width="329px" border="0">
        	<tr >
        		<td width="329px" height="100px" style="font-size: 20px;vertical-align:bottom;"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$codigo.'</b></td>
        	</tr>
        	<tr >
        		<td width="329px" height="10px">&nbsp;</td>
        	</tr>        	
        </table>
        </td>
      </tr> 
      <tr>
      <td colspan="3" height="110px">
      	<table width="987px" border="0">
      	<tr>
      		<td width="100px" height="30px">&nbsp;</td>
      		<td width="400px" height="30px">'. $nombre_contacto .'</td>
      		<td width="278px" height="30px">&nbsp;</td>
      		<td width="209px" height="30px">' . number_format(substr($rut_cliente,0,strlen($rut_cliente) - 1),0,".",".")."-".substr($rut_cliente,-1) . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">'. $direccion .'</td>
      		<td width="278px" height="15px">&nbsp;</td>
      		<td width="209px" height="15px">' . $comuna .'</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">' . $ciudad . '</td>
      		<td width="278px" height="15px">' . $fono . '</td>
      		<td width="209px" height="15px">' .  $giro . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="20px">&nbsp;</td>
      		<td width="400px" height="20px">&nbsp;</td>
      		<td width="278px" height="20px">&nbsp;</td>
      		<td width="209px" height="20px">&nbsp;</td>
      	</tr>      	
      	</table>
      </td>
      </tr>
      <tr>
		      	<td colspan="3" >
		      	<table width="987px" border="0">';
		 $tamano_maximo = 400;
		 $i = 1;
		foreach($items->result() as $v){      
			$this->db->where('id', $v->id_producto);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];		

		      $html .= '
		      		
				      	<tr>
				      		<td width="100px" height="20px">' . $producto->codigo . '</td>
				      		<td width="420px" height="20px">' . $producto->nombre . '</td>
				      		<td width="100px" height="20px">' . $v->cantidad . '</td>
				      		<td width="78px" height="20px"></td>
				      		<td width="100px" height="20px">' . number_format($v->precio, 0, ',', '.') . '</td>
				      		<td width="70px" height="20px">' . number_format($v->descuento, 0, ',', '.') . '</td>
				      		<td width="119px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
				      	</tr>
				     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 20;
  	}

  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 20;	
  	}
  	
    $html .= ' </table>
		      	</td>
		      </tr>


		      <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="0">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">&nbsp;</td>
		      		<td width="420px" height="20px">' . $forma_pago . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td rowspan="3" width="119px" height="60px">&nbsp;</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">&nbsp;</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">Fecha Vencimiento: '. $dia.'/'.$mes.'/'.$anio.'</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>


		      <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="1">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">' . $ticket_text .'</td>
		      		<td rowspan="3" width="420px" height="60px">' . valorEnLetras($totalFactura) . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td width="119px" height="20px">' . number_format($montoNeto, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoAfecto, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($totalFactura, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>
		      <tr>
		      	<td  colspan="3" >
		      		<table width="987px" border="1">
		      			<tr>
		      				<td width="698px" height="40px">&nbsp;</td>
		      				<td width="289px" height="40px">'. $nom_obs .'</td>
		      			</tr>
		      			<tr>
		      				<td width="698px" height="20px">&nbsp;</td>
		      				<td width="289px" height="20px">'. number_format(substr($rut_obs,0,strlen($rut_obs) - 1),0,".",".")."-".substr($rut_obs,-1) .'</td>
		      			</tr>		      			
		      		</table>
		      	</td>
		      </tr>
		      </table>';
 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
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
			'letter',    // format - A4, for example, default ''
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
		exit;

		}else{

			$items = $this->db->get_where('detalle_factura_glosa', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$id = $row->id_factura;
		$nombre_contacto = $row->nombre_cliente;
		$observacion = $row->observacion;
		$rut_cliente = $row->rut_cliente;
		$rut_obs = $row->rut_obs;
		$nom_obs = $row->nom_observ;
		if ($row->direc_sucursal){
			$direccion = $row->direc_sucursal;
			$comuna = $row->com_sucursal;
			$ciudad = $row->ciu_sucursal;	
		}else{
			$direccion = $row->direccion;
			$comuna = $row->nombre_comuna;
			$ciudad = $row->nombre_ciudad;
	    };
		$fecha = $row->fecha_venc;
		$giro = $row->giro;
		$fono = $row->fono;
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale <br> ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_compras', array('id' => $row->id));		
		$forma_pago = $row->cond_pago;
		$montoNeto = 0;
	    $ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoAfecto = $reg->sub_total;
			$montoDescuento = $reg->descuento;
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
   <table width="987px" border="0">
   	 
      <tr>
      	<td width="250px"  height="110px">&nbsp;</td>
        <td width="408px"  height="110px" style="font-size: 20px;vertical-align:bottom;">&nbsp;'. $dia2 . '&nbsp;&nbsp;&nbsp;&nbsp;'.$mes2.'&nbsp;&nbsp;&nbsp;&nbsp;'.$anio2.'</td>
        <td width="329px"  height="110px" >
        <table width="329px" border="0">
        	<tr >
        		<td width="329px" height="100px" style="font-size: 20px;vertical-align:bottom;"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$codigo.'</b></td>
        	</tr>
        	<tr >
        		<td width="329px" height="10px">&nbsp;</td>
        	</tr>        	
        </table>
        </td>
      </tr> 
      <tr>
      <td colspan="3" height="110px">
      	<table width="987px" border="0">
      	<tr>
      		<td width="100px" height="30px">&nbsp;</td>
      		<td width="400px" height="30px">'. $nombre_contacto .'</td>
      		<td width="278px" height="30px">&nbsp;</td>
      		<td width="209px" height="30px">' . number_format(substr($rut_cliente,0,strlen($rut_cliente) - 1),0,".",".")."-".substr($rut_cliente,-1) . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">'. $direccion .'</td>
      		<td width="278px" height="15px">&nbsp;</td>
      		<td width="209px" height="15px">' . $comuna .'</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">' . $ciudad . '</td>
      		<td width="278px" height="15px">' . $fono . '</td>
      		<td width="209px" height="15px">' .  $giro . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="20px">&nbsp;</td>
      		<td width="400px" height="20px">&nbsp;</td>
      		<td width="278px" height="20px">&nbsp;</td>
      		<td width="209px" height="20px">&nbsp;</td>
      	</tr>      	
      	</table>
      </td>
      </tr>
      <tr>
		      	<td colspan="3" >
		      	<table width="987px" border="0">';
		 $tamano_maximo = 400;
		 $i = 1;
		 $cantidad = 1;
		foreach($items->result() as $v){
		      
		      $guia=""; 
		      if (!$v->glosa){		      	
		      	$v->glosa="SEGUN GUIA";
		      	$guia = $v->num_guia;
		      	$cantidad="";
		      	$items2 = $this->db->get_where('detalle_factura_compra', array('num_factura' => $v->num_guia));

		      	foreach($items2->result() as $v){

		      		$data3 = array(
	         			'id_despacho' => $id
				    );
				    $this->db->where('id', $v->id);
				  
				    $this->db->update('detalle_factura_compra', $data3);
		      	    
					$this->db->where('id', $v->id_producto);
					$producto = $this->db->get("productos");	
					$producto = $producto->result();
					$producto = $producto[0];		

					      $html .= '
					      		
							      	<tr>
							      		<td width="100px" height="20px">' . $producto->codigo . '</td>
							      		<td width="420px" height="20px">' . $producto->nombre . '</td>
							      		<td width="100px" height="20px">' . $v->cantidad . '</td>
							      		<td width="78px" height="20px"></td>
							      		<td width="100px" height="20px">' . number_format($v->precio, 0, ',', '.') . '</td>
							      		<td width="70px" height="20px">' . number_format($v->descuento, 0, ',', '.') . '</td>
							      		<td width="119px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
							      	</tr>
							     ';
					      $i++;
					      $tamano_maximo = $tamano_maximo - 20;
			  		}		
		      			
		    
		      
		     }else{

		     	$html .= '
		      		
				      	<tr>
				      	    <td width="160px" height="20px"></td>
				      		<td width="540" height="20px">' . $v->glosa . '</td>
				      		<td width="50px" height="20px">' . $cantidad . '</td>
				      		<td width="58px" height="20px"></td>
				      		<td width="140px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
				      		<td width="70px" height="20px">' . number_format($v->iva, 0, ',', '.') . '</td>
				      		<td width="99px" height="20px">' . number_format($v->total, 0, ',', '.') . '</td>
				      	</tr>
				     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 20;
		     	

		     }
  	}

  	if (!$v->glosa){

  		$guia="";
  		foreach($items->result() as $v){
  			
		$html .= '
		      		
	     <tr>
	      		<td width="50px" height="20px"></td>
	      		<td width="10px" height="20px">Segun Guia : '. $v->num_guia .'</td>
	      		<td width="5px" height="20px"></td>
	      		<td width="278px" height="20px"></td>
	     ';

	     };



		};
  	


  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 20;	
  	}
  	
    $html .= ' </table>
		      	</td>
		      </tr>


		      <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="0">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">&nbsp;</td>
		      		<td width="420px" height="20px">' . $forma_pago . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td rowspan="3" width="119px" height="60px">&nbsp;</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">&nbsp;</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">Fecha Vencimiento: '. $dia.'/'.$mes.'/'.$anio.'</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>
		      <tr>
		     <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="1">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">' . $ticket_text .'</td>
		      		<td rowspan="3" width="420px" height="60px">' . valorEnLetras($totalFactura) . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td width="119px" height="20px">' . number_format($montoNeto, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoAfecto, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($totalFactura, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>
		      <tr>
		      	<td  colspan="3" >
		      		<table width="987px" border="0">
		      			<tr>
		      				<td width="698px" height="40px">&nbsp;</td>
		      				<td width="289px" height="40px">'. $nom_obs .'</td>
		      			</tr>
		      			<tr>
		      				<td width="698px" height="20px">&nbsp;</td>
		      				<td width="289px" height="20px">'. number_format(substr($rut_obs,0,strlen($rut_obs) - 1),0,".",".")."-".substr($rut_obs,-1) .'</td>
		      			</tr>		      			
		      		</table>
		      	</td>
		      </tr>
		      </table>';
 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
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
			'letter',    // format - A4, for example, default ''
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
		exit;
		}
	}

	public function exportlotePDF(){

		$idfactura = $this->input->get('idfactura');
		$numero = $this->input->get('numfactura');
		$cabecera = $this->db->get_where('factura_compras', array('id' => $idfactura));	
		//$tipodocumento = 19;
		$tipodocumento2 = 19;
		foreach($cabecera->result() as $v){  
				$tipodocumento = $v->tipo_documento; 
		}

		if($tipodocumento == 19 or $tipodocumento == 1 ){
				$this->exportFacturalotePDF($idfactura,$numero);

		}else{

				$this->exportBoletaPDF($idfactura,$numero);

		};

	}

	//$idfactura,$numero

	public function exportFacturalotePDF($idfactura,$numero){

		//$idfactura = $this->input->get('idfactura');
		//$numero = $this->input->get('numfactura');

        if ($idfactura){
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_compras acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = ma.id)
			left join ciudad sa on (cs.id_ciudad = sa.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.id = '.$idfactura.'');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_compras acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = ma.id)
			left join ciudad sa on (cs.id_ciudad = sa.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.num_factura = '.$numero.'

		');


		}

		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		$fecha = $row->fecha_venc;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);
		 
		//items
		$items = $this->db->get_where('detalle_factura_glosa', array('id_factura' => $row->id));
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$observacion = $row->observacion;
		$rut_cliente = $row->rut_cliente;
		$rut_obs = $row->rut_obs;
		$nom_obs = $row->nom_observ;
		$direccion = $row->direccion;
		$comuna = $row->nombre_comuna;
		$ciudad = $row->nombre_ciudad;
		$fecha = $row->fecha_venc;
		$giro = $row->giro;
		$cabecera = $this->db->get_where('factura_compras', array('id' => $row->id));		
		$montoNeto = 0;
	    $ivaTotal = 0;
		$totalFactura = 0;
		if ($row->direc_sucursal){
			$direccion = $row->direc_sucursal;
			$comuna = $row->com_sucursal;
			$ciudad = $row->ciu_sucursal;	
		}else{
			$direccion = $row->direccion;
			$comuna = $row->nombre_comuna;
			$ciudad = $row->nombre_ciudad;
	    };
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
	
	if ($v->num_guia == 0){
		
		$v->num_guia = " ";

	}else{

		$v->glosa = "Segun Guia";
		

	};
			

     $html .= '<tr>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td ><b>'.($v->glosa).' '.($v->num_guia).'</b></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td align="right">'.number_format($v->neto, 0, ',', '.').'</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td align="right"></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>       
        <td align="right"></td>
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
		       
		        </tr>';
    	}
    }

    	$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';

      
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
      	<td p align="right"><b>'.number_format($montoNeto, 0, ',', '.').'</b></td>
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
      	<td p align="right"><b>'.number_format($ivaTotal, 0, ',', '.').'</b></td>
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
      	<td p align="right"><b>'.number_format($totalFactura, 0, ',', '.').'</b></td>
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
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, p.num_ticket  FROM factura_compras acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_proveedor = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id = '.$idfactura.'
		');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, p.num_ticket  FROM factura_compras acc
			left join preventa p on acc.id = p.id_documento
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

		if ($row->forma == 0){

		$items = $this->db->get_where('detalle_factura_compra', array('id_factura' => $row->id));
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
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale: ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_compras', array('id' => $row->id));		
		$nom_vendedor = $row->nom_vendedor;
		$montoNeto = 0;
		$ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
			$descuento = (($reg->descuento)*1.19);

		}
				
$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Boleta</title>
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

.page
{
page-break-after: always;
}

		
-->
</style>
</head>

<body>
   <table width="10px" height="8px" border="0">   	 
       <tr>
      	<td width="100px">
      		<table width="100px" border="0"> 		

      		<tr>
      		    <td width="400px" height="8px">&nbsp;</td>
	      		<td width="100px" height="8px">'.$nom_vendedor.'</td>
	      	</tr>
      			
      		</table>
      	</td>
      </tr>
       <tr>
      	<td width="987px">
      		<table width="987px" border="0">   		

      		<tr>
	      		<td width="50px" height="8px"></td>
	      		<td width="50px" height="8px"></td>
	      		<td width="80px" height="8px"></td>
	      		<td width="99px" height="8px"></td>
	      	</tr>
      			
      		</table>
      	</td>
      </tr>
       
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
	      		 <td width="410px" height="8px">&nbsp;</td>
	      		<td width="100px" height="8px">'.$dia2.'/'.$mes2.'/'.$anio2.'</td>
	       	</tr>
      		</table>
      	</td>
      </tr>  
      <tr>
      	<td width="987px" height="25px">
      	&nbsp;
      	</td>
      </tr>       
      <tr>
  	<td width="987px" >
  	<table width="987px" border="0">';
		 $tamano_maximo = 230;
		 $i = 1;
		foreach($items->result() as $v){      
			$this->db->where('id', $v->id_producto);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];		

		      $html .= '
		      		
      	<tr>
      		<td width="50px" height="8px">' . $producto->codigo . '</td>
      		<td width="50px" height="8px">' . $v->cantidad . '</td>
      		<td width="250px" height="8px">' . $producto->nombre . '</td>
      		<td width="100px" height="8px">' . number_format($v->precio, 0, ',', '.') . '</td>
      		<td width="169px" height="8px">' . number_format($v->totalproducto, 0, ',', '.') . '</td>
      	</tr>
     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 15;
  	}

  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 15;	
  	}



	$html .= '</table></td></tr>

	
   <tr>
  	<td width="987">
  		<table width="987" border="0">
  		<tr>
  			<td width="350px" height="20px">&nbsp;</td>
  			<td width="110px" height="20px">Descuento</td>
			<td width="79px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . number_format($descuento, 0, ',', '.') .'</td>
			<p class=\"page\"></p>
  		</tr>
  		</table>
  	</td>
  </tr>   
  <tr>
  	<td width="987">
  		<table width="987" border="0">
  		<tr>
  			<td width="10px" height="20px">&nbsp;</td>
  			<td width="450px" height="20px">' . $ticket_text .'</td>
			<td width="59px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . number_format($totalFactura, 0, ',', '.') .'</td>
			<p class=\"page\"></p>
  		</tr>
  		</table>
  	</td>
  </tr>      
 


	

	</table>';

 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
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
			2,    // margin_left
			15,    // margin right
			2,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'P'    // L - landscape, P - portrait
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
			'P'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		*/
		exit;

		}else{


		$items = $this->db->get_where('detalle_factura_glosa', array('id_factura' => $row->id));
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
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale: ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_compras', array('id' => $row->id));		
		$nom_vendedor = $row->nom_vendedor;
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
   <table width="987px" border="0">
   	 
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
      			<td width="740px" height="25px">&nbsp;</td>
				<td width="247px" height="25px">'.$codigo.'</td>
      		</tr>
      		</table>
      	</td>
      </tr> 
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
      			<td width="800px" height="40px">&nbsp;</td>
				<td width="187px" height="40px" style="font-size: 15px;vertical-align:bottom;">'.$dia2.'/'.$mes2.'/'.$anio2.'</td>
      		</tr>
      		</table>
      	</td>
      </tr>  
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
      			<td width="50px" height="20px">&nbsp;</td>
				<td width="937px" height="20px" style="font-size: 15px;vertical-align:bottom;">VENDEDOR: '.$nom_vendedor.'</td>
      		</tr>
      		</table>
      	</td>
      </tr>  
      <tr>
      	<td width="987px" height="25px">
      	&nbsp;
      	</td>
      </tr>       
      <tr>
		      	<td width="987px" >
		      	<table width="987px" border="0">';
		 $tamano_maximo = 240;
		 $i = 1;
		 $cantidad = 1;
		foreach($items->result() as $v){      
			
		      $html .= '
		      		
				      	<tr>
				      	    <td width="160px" height="20px"></td>
				      		<td width="540" height="20px">' . $v->glosa . '</td>
				      		<td width="50px" height="20px">' . $cantidad . '</td>
				      		<td width="58px" height="20px"></td>
				      		<td width="140px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
				      		<td width="70px" height="20px">' . number_format($v->iva, 0, ',', '.') . '</td>
				      		<td width="99px" height="20px">' . number_format($v->total, 0, ',', '.') . '</td>
				      	</tr>
				     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 20;
  	}

  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 20;	
  	}



	$html .= '</table></td></tr>

				<tr>
		      	<td width="987px">
		      		<table width="987px" border="0">
		      		<tr>
		      			<td width="160px" height="20px">&nbsp;</td>
						<td width="827px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . valorEnLetras($totalFactura) .'</td>
		      		</tr>
		      		</table>
		      	</td>
		      </tr>  
		      <tr>
		      	<td width="987px">
		      		<table width="987px" border="0">
		      		<tr>
		      			<td width="500px" height="20px">&nbsp;</td>
		      			<td width="388px" height="20px">' . $ticket_text .'</td>
						<td width="99px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . number_format($totalFactura, 0, ',', '.') .'</td>
		      		</tr>
		      		</table>
		      	</td>
		      </tr>  
		      	

	</table>';
 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
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
			'letter',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'P'    // L - landscape, P - portrait
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
			'P'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		*/
		exit;
		}
	}


        

}









