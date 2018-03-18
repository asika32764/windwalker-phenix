<?php
/**
 * Part of Phoenix project.
 *
 * @copyright  Copyright (C) 2016 LYRASOFT. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace Phoenix\Script;

/**
 * The JQuery class.
 *
 * @since  1.0
 */
abstract class JQueryScript extends AbstractPhoenixScript
{
    /**
     * jquery
     *
     * @param   boolean $noConflict
     *
     * @return  void
     */
    public static function core($noConflict = false)
    {
        $asset = static::getAsset();

        if (!static::inited(__METHOD__)) {
            $asset->addScript(static::phoenixName() . '/js/jquery/jquery.js');
        }

        if (!static::inited(__METHOD__, (bool) $noConflict) && $noConflict) {
            $asset->internalScript('jQuery.noConflict();');
        }
    }

    /**
     * ui
     *
     * @param array $components
     *
     * @return  void
     */
    public static function ui(array $components)
    {
        sort($components);

        static::core();
        $asset = static::getAsset();

        if (!static::inited(__METHOD__)) {
            $asset->addScript(static::phoenixName() . '/js/jquery/jquery.ui.core.min.js');
        }

        if (!static::inited(__METHOD__, $components)) {
            $allowedComponents = [
                'draggable',
                'droppable',
                'resizable',
                'selectable',
                'sortable',
                'effect',
            ];

            foreach ($components as $component) {
                if (in_array($component, $allowedComponents)) {
                    $asset->addScript(static::phoenixName() . '/js/jquery/jquery.ui.' . $component . '.min.js');
                }
            }
        }
    }

    /**
     * colorpicker
     *
     * @param string $selector
     * @param array  $options
     *
     * @return  void
     */
    public static function colorPicker($selector = '.colorpicker', $options = [])
    {
        if (!static::inited(__METHOD__)) {
            static::core();

            static::addJS(static::phoenixName() . '/js/jquery/jquery.minicolors.min.js');
            static::addCSS(static::phoenixName() . '/css/jquery/jquery.minicolors.min.css');
        }

        if (!static::inited(__METHOD__, get_defined_vars())) {
            $defaultOptions = [
                'control' => 'hue',
                'position' => 'left',
                'theme' => 'bootstrap',
            ];

            $options = static::getJSObject($defaultOptions, $options);

            $js = <<<JS
// Color picker
jQuery(document).ready(function($)
{
	$('$selector').each(function() {
		$(this).minicolors($options);
	});
});
JS;
            static::internalJS($js);
        }
    }

    /**
     * highlight
     *
     * @param  string $selector
     * @param  string $text
     * @param  array  $options
     *
     * @see  http://bartaz.github.io/sandbox.js/jquery.highlight.html
     *
     * @return  void
     */
    public static function highlight($selector = null, $text = null, $options = [])
    {
        if (!static::inited(__METHOD__)) {
            JQueryScript::core();

            static::addJS(static::phoenixName() . '/js/jquery/jquery.highlight.js');
        }

        if (!static::inited(__METHOD__, get_defined_vars()) && $selector && $text) {
            if (is_array($text)) {
                $text = implode(' ', $text);
            }

            $defaultOptions = [
                'element' => 'mark',
                'className' => 'phoenix-highlight',
            ];

            $options = static::getJSObject($defaultOptions, $options);

            $js = <<<JS
// Highlight Text
jQuery(document).ready(function($) {
	$('$selector').highlight('$text', $options);
});
JS;
            static::internalJS($js);
        }
    }

    /**
     * csrfToken
     *
     * @param string $token
     *
     * @return  void
     *
     * @since   1.1
     */
    public static function csrfToken($token = null)
    {
        if (!static::inited(__METHOD__)) {
            CoreScript::csrfToken($token);

            $js = <<<JS
jQuery.ajaxSetup({
    headers: {
        'X-CSRF-Token': jQuery('meta[name="csrf-token"]').attr('content')
    }
});
JS;

            static::internalJS($js);
        }
    }

    /**
     * dependsOn
     *
     * @param string $selector
     * @param array  $conditions
     * @param array  $options
     *
     * @return  void
     */
    public static function dependsOn($selector = null, array $conditions = [], array $options = [])
    {
        if (!static::inited(__METHOD__)) {
            static::core();
            static::addJS(static::phoenixName() . '/js/depends-on/dependsOn.min.js');
        }

        if (!static::inited(__METHOD__, get_defined_vars()) && $selector !== null) {
            $conditions = static::getJSObject($conditions);
            $options    = static::getJSObject($options);

            PhoenixScript::domready("$('$selector').dependsOn($conditions, $options);");
        }
    }
}
