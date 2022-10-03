<?php 
get_header(); 

echo '<main class="page">';
	include 'blocks.php';
	echo do_shortcode('[contact-form-7 id="9" title="Контактная форма 1"]');
echo '</main>';

get_footer();