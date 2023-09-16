import { api } from "@/lib/axios";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { useEffect, useState } from "react";

interface Prompt {
  id: string
  title: string
  template: string
}

interface PrompSelectProps {
  onPromptSelected: (template: string) => void
}

export function PromptSelect(props: PrompSelectProps) {
  const [prompts, setPrompts] = useState<Prompt[] | null>(null)

  useEffect(() => {
    api.get('/prompts').then(response => {
      console.log(response.data)
      setPrompts(response.data)
    })
  }, []) // => puxando os prompt contidas no backEnd

  function handlePromptSelected(promptId: string) {
    const selectedPrompt = prompts?.find(prompt => prompt.id == promptId)

    if(!selectedPrompt) {
      return
    }

    props.onPromptSelected(selectedPrompt.template)
  }

  return (
    <Select onValueChange={handlePromptSelected}>
      <SelectTrigger>
        <SelectValue placeholder='Selecione um prompt...' />
      </SelectTrigger>
      <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}