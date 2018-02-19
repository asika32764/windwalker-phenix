<?php
/**
 * Part of {$package.name.cap$} project.
 *
 * @copyright  Copyright (C) 2016 {ORGANIZATION}. All rights reserved.
 * @license    GNU General Public License version 2 or later.
 */

namespace {$package.namespace$}{$package.name.cap$}\Model;

use {$package.namespace$}{$package.name.cap$}\Record\{$controller.item.name.cap$}Record;
use Phoenix\Model\AdminModel;
use Windwalker\Data\DataInterface;
use Windwalker\Record\Record;

/**
 * The {$controller.item.name.cap$}Model class.
 *
 * @since  1.0
 */
class {$controller.item.name.cap$}Model extends AdminModel
{
    /**
     * Property name.
     *
     * @var  string
     */
    protected $name = '{$controller.item.name.cap$}';
    /**
     * Property record.
     *
     * @var  string
     */
    protected $record = '{$controller.item.name.cap$}';
    /**
     * Property mapper.
     *
     * @var  string
     */
    protected $mapper = '{$controller.item.name.cap$}';
    /**
     * Property reorderConditions.
     *
     * @var  array
     */
    protected $reorderConditions = [];
    /**
     * Property reorderPosition.
     *
     * @var  string
     */
    protected $reorderPosition = self::ORDER_POSITION_LAST;

    /**
     * postGetItem
     *
     * @param DataInterface|{$controller.item.name.cap$}Record $item
     *
     * @return  void
     */
    protected function postGetItem(DataInterface $item)
    {
        // Do some stuff
    }

    /**
     * prepareRecord
     *
     * @param Record|{$controller.item.name.cap$}Record $record
     *
     * @return  void
     */
    protected function prepareRecord(Record $record)
    {
        parent::prepareRecord($record);
    }

    /**
     * postSaveHook
     *
     * @param Record|{$controller.item.name.cap$}Record $record
     *
     * @return  void
     */
    protected function postSaveHook(Record $record)
    {
        parent::postSaveHook($record);
    }

    /**
     * getReorderConditions
     *
     * @param Record|{$controller.item.name.cap$}Record $record
     *
     * @return  array  An array of conditions to add to ordering queries.
     */
    public function getReorderConditions(Record $record)
    {
        return parent::getReorderConditions($record);
    }

    /**
     * Method to set new item ordering as first or last.
     *
     * @param   Record|{$controller.item.name.cap$}Record $record   Item table to save.
     * @param   string              $position `first` or other are `last`.
     *
     * @return  void
     */
    public function setOrderPosition(Record $record, $position = self::ORDER_POSITION_LAST)
    {
        parent::setOrderPosition($record, $position);
    }
}
