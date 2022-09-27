<?php 
    if (have_rows('all_blocks')) :
        $i = 1;
        while (have_rows('all_blocks')) : the_row();
            if (get_row_layout() == 'template1') :
                $title = get_sub_field('template0_title');
                
                echo '<section id="template0-'. $i .'" class="template0">';
                    echo '<div class="template0__container">';
                        echo $title != '' ? '<h2 class="template0__title">'. $title .'</h2>' : '';
                    echo '</div>';
                echo '</section>';
            elseif (get_row_layout() == 'template0') :
                $title = get_sub_field('template0_title');
                
                echo '<section id="template0-'. $i .'" class="template0">';
                    echo '<div class="template0__container">';
                        echo $title != '' ? '<h2 class="template0__title">'. $title .'</h2>' : '';
                    echo '</div>';
                echo '</section>';
            endif;
            $i++;
        endwhile;
    endif;
    if (get_the_content()) :
        echo '<section id="single-content" class="single-content">';
            echo '<div class="single-content__container">';
                the_content();
            echo '</div>';
        echo '</section>';
    endif;
