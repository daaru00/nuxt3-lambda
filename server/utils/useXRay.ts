import AWSXRay from 'aws-xray-sdk'
import type { Subsegment } from 'aws-xray-sdk'

export default function() {
  const runtimeConfig = useRuntimeConfig()
  const isXRayEnabled = runtimeConfig?.xray?.tracking.toLocaleLowerCase() === 'active'

  function captureAWSClient(client: any): any {
    if (!isXRayEnabled) {
      return client
    }
    
    return AWSXRay.captureAWSv3Client(client)
  }

  function openSegment(name: string): Subsegment|undefined {
    if (!isXRayEnabled) {
      console.log('[XRAY] open segment', name)
      return
    }

    let segment
    try {
      segment = AWSXRay.getSegment()
    } catch (error: any) {
      console.error('[XRAY] cannot open segment', name, error.message)
      return
    }

    if (!segment) {
      console.log('[XRAY] cannot find current segment', name)
      return
    }

    return segment.addNewSubsegment(name)
  }

  function addSegmentAnnotation(segment?: Subsegment, key?: string, value?: string | number | boolean): void {
    if (!isXRayEnabled || !segment || !key || !value) {
      console.log('[XRAY] add segment annotation', key, value)
      return
    }
    segment.addAnnotation(key, value)
  }

  function addSegmentMetadata(segment?: Subsegment, key?: string, value?: any, namespace?: string): void {
    if (!isXRayEnabled || !segment || !key || !value) {
      console.log('[XRAY] add segment metadata', key, value, namespace || '')
      return
    }
    segment.addMetadata(key, value, namespace)
  }

  function closeSegment(segment?: Subsegment): void {
    if (!isXRayEnabled || !segment) {
      console.log('[XRAY] segment close')
      return
    }
    segment.close()
  }

  return {
    captureAWSClient,
    openSegment,
    addSegmentAnnotation,
    addSegmentMetadata,
    closeSegment
  }
}
