<?php
/**
 * Part of phoenix project.
 *
 * @copyright  Copyright (C) 2015 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later;
 */

namespace Phoenix\Generator\Action\Package\Subsystem;

use Phoenix\Generator\Action\AbstractAction;
use Phoenix\Generator\FileOperator\CopyOperator;
use Windwalker\String\StringHelper;

/**
 * The CopyListAction class.
 *
 * @since  {DEPLOY_VERSION}
 */
class CopyListAction extends AbstractAction
{
	/**
	 * Do this execute.
	 *
	 * @return  mixed
	 */
	protected function doExecute()
	{
		/** @var CopyOperator $copyOperator */
		$copyOperator = $this->container->get('operator.factory')->getOperator('copy');

		$src  = $this->config['dir.src'];
		$dest = $this->config['dir.dest'];
		$list = StringHelper::quote('controller.list.name.cap', $this->config['tagVariables']);

		$files = array(
			'Controller/%s',
			'Field',
			'Form/%s',
			'Model/%sModel.php.tpl',
			'Templates/' . StringHelper::quote('controller.list.name.lower', $this->config['tagVariables']),
			'View/%s'
		);

		foreach ($files as $file)
		{
			$file = sprintf($file, $list);

			if (!file_exists($src . '/' . $file))
			{
				continue;
			}

			$copyOperator->copy(
				$src . '/' . $file,
				$dest . '/' . $file,
				$this->config['replace']
			);
		}
	}
}
