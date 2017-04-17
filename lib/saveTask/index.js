'use babel'

import call from '../helpers/call'
import prompt from '../helpers/prompt'
import getConfig from '../helpers/getConfig'
import _ from 'underscore'
/* global atom */

export default async function () {
  const projectId = getConfig().projectId
  if (!projectId) {
    return atom.notifications.addError('Error: projectId not found in .orionsoftrc')
  }
  const categories = (await call(`
    query getTasks($projectId: ID!) {
      tasks(projectId: $projectId, sortBy: "completedAt", sortType: DESC, limit: 100) {
        items {
          category
        }
      }
    }
  `, {projectId})).tasks.items.map(task => ({label: task.category, value: task.category}))

  const task = await prompt({
    title: 'Save Task',
    fields: {
      name: {
        placeholder: 'Tarea',
        type: 'text'
      },
      category: {
        placeholder: 'Categoría',
        type: 'options',
        options: _.uniq(categories, task => task.value),
        allowOthers: true
      },
      duration: {
        placeholder: 'Duración',
        type: 'options',
        allowOthers: true,
        options: [
          {value: 30, label: '30m'},
          {value: 60, label: '1h'},
          {value: 60 * 2, label: '2h'},
          {value: 60 * 3, label: '3h'},
          {value: 60 * 4, label: '4h'},
          {value: 60 * 5, label: '5h'},
          {value: 60 * 6, label: '6h'},
          {value: 60 * 8, label: '8h'},
          {value: 60 * 10, label: '10h'}
        ]
      },
      type: {
        placeholder: 'Tipo',
        type: 'options',
        options: [
          {
            label: 'Arreglo',
            value: 'fix'
          },
          {
            label: 'Nueva funcionalidad',
            value: 'feature'
          },
          {
            label: 'Refactorización',
            value: 'refactoring'
          }
        ]
      }
    }
  })
  task.completedAt = new Date()
  task.projectId = projectId
  const query = `mutation createTask ($task: ProjectTaskInput!) {
    createTask (task: $task) {
      _id
    }
  }`
  await call(query, {task})

  atom.notifications.addSuccess('Task created')
}
