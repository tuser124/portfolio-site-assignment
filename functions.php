<?php
function my_theme_setup(){
    
    register_nav_menus(array(
        'header-menu' => 'ヘッダーメニュー',
    ));

    add_theme_support('post-thumbnails');
}

add_action('after_setup_theme', 'my_theme_setup');

function my_theme_enqueue_assets(){
    wp_enqueue_style(
        'portfolio-style',
        get_stylesheet_uri(),
        array(),
        filemtime(get_template_directory() . '/style.css')
    );

    wp_enqueue_script(
    'portfolio-script',
    get_template_directory_uri() . '/js/script.js',
    array(),
    filemtime(get_template_directory() . '/js/script.js'),
    true
);

}

add_action('wp_enqueue_scripts', 'my_theme_enqueue_assets');

function my_theme_register_works(){

    register_post_type('works', array(
        'labels' => array(
            'name' => '制作実績',
            'add_new_item' => '制作実績を追加',
            'edit_item' => '制作実績を編集',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => false,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array('title', 'editor', 'thumbnail'),
    ));
}

add_action('init', 'my_theme_register_works');

function my_theme_add_works_meta_box() {
    add_meta_box(
        'works_details',
        '作品の詳細情報',
        'my_theme_works_meta_box_html',
        'works',
        'normal',
        'default'
    );
}

add_action('add_meta_boxes', 'my_theme_add_works_meta_box');

function my_theme_works_meta_box_html($post) {
    $technologies = get_post_meta($post->ID, 'works_technologies', true);
    $period = get_post_meta($post->ID, 'works_period', true);

    wp_nonce_field('save_works_details', 'works_details_nonce');
    ?>

    <p>
        <label for="works_technologies">使用技術</label><br>
        <input type="text" id="works_technologies" name="works_technologies"
               value="<?php echo esc_attr($technologies); ?>" style="width:100%;">
    </p>

    <p>
        <label for="works_period">制作期間</label><br>
        <input type="text" id="works_period" name="works_period"
               value="<?php echo esc_attr($period); ?>" style="width:100%;">
    </p>

    <?php
}

function my_theme_save_works_details($post_id) {
    if (!isset($_POST['works_details_nonce'])) {
        return;
    }

    if (!wp_verify_nonce(
        sanitize_text_field(wp_unslash($_POST['works_details_nonce'])),
        'save_works_details'
    )) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    foreach (array('works_technologies', 'works_period') as $field) {
        if (isset($_POST[$field]) && !is_array($_POST[$field])) {
            update_post_meta(
                $post_id,
                $field,
                sanitize_text_field(wp_unslash($_POST[$field]))
            );
        }
    }
}

add_action('save_post_works', 'my_theme_save_works_details');