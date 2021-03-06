import React, { useState, Fragment, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import { InformationCircleIcon } from '@heroicons/react/outline'

function Modal(props, ref) {
  let [open, setOpen] = useState(false)
  let [type, setType] = useState(
    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
      <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
    </div>
  )
  let [titleModal, setTitleModal] = useState(false)
  let [contentModal, setContentModal] = useState(false)
  let [customButtons, setCustomButtons] = useState(null)
  const modalRef = useRef();

  const cancelButtonRef = useRef(null)

  const closeModal = () => {
    setOpen(false)
  }

  const typeSwitch = (type) => {
    switch (type) {
      case 'info':
        setType(
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
            <InformationCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
          </div>
        )
        break;
      case 'error':
        setType(
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
        </div>
        )
        break;
      default:
        break;
    }
  }

  const openModal = (type, title, content, customButtons) => {
    typeSwitch(type)
    setTitleModal(title)
    setContentModal(content)
    setCustomButtons(customButtons)
    setOpen(true)
  }

  useImperativeHandle(ref, () => ({ closeModal, openModal }), [])

  return (
    <Transition.Root show={open} as={Fragment} ref={modalRef}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    {type}
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                        {titleModal}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {contentModal}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {customButtons && customButtons}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default forwardRef(Modal);