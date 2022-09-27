<!doctype html>
<html <?php language_attributes(); ?>>

<head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php 
	wp_body_open();
	
	echo '<div class="wrapper">';
		echo '<header class="header">';
			echo '<div class="header__container">';
				echo 'header';
				/* wp_nav_menu([
					'theme_location'  => 'header',
					'menu'            => '',
					'container'       => false,
					'menu_class'      => "menu__list",
				]); */
			echo '</div>';
		echo '</header>';
	?>