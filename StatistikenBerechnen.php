<!DOCTYPE html>
<?php

$jsonfile = file_get_contents('.../JsonBeispiel.json');
$jsonarray = json_decode($jsonfile);

function getStatistics($jsonarray)
{
	$xCoordinate;
	$yCoordinate;
	$durchschnittswert1;
	$durchschnittswert2;
	$durchschnittswert3;
	$anzahl; 
	$statistiken[];
	$firstCounter = 0; 
	
	
	foreach($string in $jsonarray)
	{
		foreach($element in $string) 
		{ 
			if ($element[bandwith] == "")
			{
				// Location ausgeben 
				$xCoordinate = $element[Xcoordinate];
				$yCoordinate = $element[Ycoordinate];
				$anzahl = 0; 
				foreach( $network in $element)
				{
					
					$durchschnittswert1 += $network[Value1];
					$durchschnittswert2 += $network[Value2];
					$durchschnittswert3 += $network[Value3];
					
					$anzahl++;
				}
				$durchschnittswert1 = $durchschnittswert1 / anzahl;
				$durchschnittswert2 = $durchschnittswert2 / anzahl;
				$durchschnittswert3 = $durchschnittswert3 / anzahl;
				
				$statistiken[$firstCounter] = ($xCoordinate,$yCoordinate,$durchschnittswert1,$durchschnittswert2,$durchschnittswert3);
				$firstCounter++;
			}
		}
	}
	return $statistiken;
}