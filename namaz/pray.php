

<?php

	// Prayer Time Calculator
	// By: Hamid Zarrabi-Zadeh
	// Inputs : $method, $year, $latitude, $longitude, $timeZone

	//import_request_variables("p");
	include('PrayTime.php');

	//if (!isset($method) || !isset($year) )
		//list($method, $year, $latitude, $longitude, $timeZone) = array(0, 2007, 43, -80, -5);
?>




<pre>
 Date   Fajr   Sunrise  Dhuhr    Asr   Sunset  Maghrib  Isha
-------------------------------------------------------------
<?php
	
	$latitude = $_GET['latitude'];//round($_GET['latti'], 2);
	$longitude = $_GET['longitude'];//round($_GET['longi'],2);
	$year = $_GET['year'];
	$timeZone = $_GET['timezone'];
	$method = $_GET['method'];
	$methodJuristic = $_GET['methodJuristic'];
	$daylight = $_GET['daylight'];
	$prayTime = new PrayTime($method);
	$prayTime->setAsrMethod($methodJuristic);
	$date = strtotime($year. '-1-1');
	$endDate = strtotime(($year+ 1). '-1-1');

	while ($date < $endDate)
	{
		$times = $prayTime->getPrayerTimes($date, $latitude, $longitude, $timeZone, $daylight);
		$day = date('M d', $date);
		print $day. "\t". implode("\t", $times). "\n";
		$date += 24* 60* 60;  // next day
	}

?>
