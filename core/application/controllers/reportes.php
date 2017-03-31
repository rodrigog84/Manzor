<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reportes extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}

	public function reporte_mensual_ventas(){

		$mes = $this->input->post('mes');
		$anno = $this->input->post('anno');

		$this->load->model('reporte');
		$neto_productos = $this->reporte->mensual_ventas($mes,$anno);
 
		foreach ($neto_productos as $producto) {
			
			 #Facturacion, Boletas, NCredito, (Facturacion+Boletas-NCredito) as totales 
			$producto->Facturacion = number_format($producto->Facturacion,0,".",".");
			$producto->Boletas = number_format($producto->Boletas,0,".",".");
			$producto->NDebito = number_format($producto->NDebito,0,".",".");
			$producto->NCredito = number_format($producto->NCredito,0,".",".");
			$producto->totales = number_format($producto->totales,0,".",".");

			if($producto->concepto == '<b>Totales</b>'){
				$producto->Facturacion = "<b>".$producto->Facturacion."</b>";
				$producto->Boletas = "<b>".$producto->Boletas."</b>";
				$producto->NDebito = "<b>".$producto->NDebito."</b>";
				$producto->NCredito = "<b>".$producto->NCredito."</b>";
				$producto->totales = "<b>".$producto->totales."</b>";
			}
		}

	 	$resp['success'] = true;
	 	$resp['data'] = $neto_productos;
	 	$resp['periodo'] = "Detalle Resumen de Ventas Mensuales - " .month2string((int)$mes)." de " . $anno;
	 	$resp['mes'] = $mes;
	 	$resp['anno'] = $anno;
        echo json_encode($resp);
	 	
	 	 
		

	}

}









