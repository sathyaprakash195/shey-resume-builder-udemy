import { getTemplateById } from '@/server-actions/templates'
import React from 'react'
import Resume from '../_components/resume'

async function TemplatePreview({params} : {
    params : {
        id : string
    }
}) {
  const response = await getTemplateById(params.id)
  return (
    <div className='flex justify-center'>
        <Resume template={response.data} />
    </div>
  )
}

export default TemplatePreview