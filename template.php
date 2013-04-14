<?php
  function cyberhuschat_preprocess_html(&$variables) {
    drupal_add_css(
      'https://fonts.googleapis.com/css?family=Cabin',
      array('type' => 'external')
    );
  }
?>
