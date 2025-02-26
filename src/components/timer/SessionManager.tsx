import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronDown, Settings, Plus, Check, Trash2, Pencil } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Session } from "@/types/Sessions"
import { WCA_EVENTS, WCAEventId } from "@/types/WCAEvents"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"

interface SessionManagerProps {
  sessions: Session[];
  currentSession: Session;
  onSessionChange: (session: Session) => void;
  onSessionCreate: (name: string, event: WCAEventId) => void;
  onSessionDelete: (id: string) => void;
  onSessionRename: (id: string, newName: string) => void;
}

export function SessionManager({
  sessions,
  currentSession,
  onSessionChange,
  onSessionCreate,
  onSessionDelete,
  onSessionRename,
}: SessionManagerProps) {
  const [isNewSessionDialogOpen, setIsNewSessionDialogOpen] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WCAEventId>('333');
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);
  const [editingSession, setEditingSession] = useState<{id: string, name: string} | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const handleCreateSession = () => {
    if (newSessionName.trim()) {
      onSessionCreate(newSessionName.trim(), selectedEvent);
      setNewSessionName("");
      setSelectedEvent('333');
      setIsNewSessionDialogOpen(false);
      setIsDropdownOpen(false);
    }
  };

  const handleDeleteSession = (id: string) => {
    setSessionToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (sessionToDelete) {
      onSessionDelete(sessionToDelete);
      setSessionToDelete(null);
      setIsDeleteConfirmOpen(false);
      setIsManageDialogOpen(false);
      setIsDropdownOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-[200px] justify-between">
            <div className="flex items-center gap-2 truncate">
              <div className="truncate">{currentSession.name}</div>
              <Badge 
                variant="secondary" 
                className="shrink-0 font-normal bg-muted/50 hover:bg-muted/70 border-0 text-muted-foreground"
              >
                {WCA_EVENTS.find(e => e.id === currentSession.event)?.name}
              </Badge>
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[320px]">
          <div className="px-3 py-2 border-b">
            <h4 className="text-sm font-medium">Sessions</h4>
          </div>
          <ScrollArea className="h-[min(300px,calc(100vh-120px))]">
            {sessions.map((session) => (
              <DropdownMenuItem 
                key={session.id}
                className={cn(
                  "flex items-center gap-2 px-3 py-2.5 cursor-pointer",
                  currentSession.id === session.id && "bg-primary/5"
                )}
                onClick={() => {
                  onSessionChange(session);
                  setIsDropdownOpen(false);
                }}
              >
                <div className="flex-1 flex items-center gap-2 min-w-0">
                  <div className="truncate font-medium">{session.name}</div>
                  <Badge 
                    variant="secondary" 
                    className="shrink-0 font-normal bg-muted/50 hover:bg-muted/70 border-0 text-muted-foreground"
                  >
                    {WCA_EVENTS.find(e => e.id === session.event)?.name}
                  </Badge>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {session.times?.length || 0} solves
                </span>
              </DropdownMenuItem>
            ))}
          </ScrollArea>
          <DropdownMenuSeparator />
          <DropdownMenuItem 
            className="px-3 py-2.5 cursor-pointer"
            onClick={() => {
              setIsNewSessionDialogOpen(true);
              setIsDropdownOpen(false);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            <span>New Session</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="px-3 py-2.5 cursor-pointer"
            onClick={() => {
              setIsManageDialogOpen(true);
              setIsDropdownOpen(false);
            }}
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Manage Sessions</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog 
        open={isNewSessionDialogOpen} 
        onOpenChange={(open) => {
          setIsNewSessionDialogOpen(open);
          if (!open) {
            setNewSessionName("");
            setSelectedEvent('333');
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Session</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Session Name</label>
              <Input
                placeholder="Enter session name"
                value={newSessionName}
                onChange={(e) => setNewSessionName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCreateSession();
                }}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Event</label>
              <ScrollArea className="h-[200px] border rounded-md">
                <div className="p-2 space-y-1.5">
                  {WCA_EVENTS.map((wcaEvent) => (
                    <div
                      key={wcaEvent.id}
                      className={cn(
                        "flex items-center justify-between px-3 py-2 rounded-md cursor-pointer hover:bg-muted/50",
                        selectedEvent === wcaEvent.id && "bg-primary/20"
                      )}
                      onClick={() => setSelectedEvent(wcaEvent.id as WCAEventId)}
                    >
                      <span>{wcaEvent.name}</span>
                      {selectedEvent === wcaEvent.id && <Check className="h-4 w-4" />}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewSessionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSession} disabled={!newSessionName.trim()}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isManageDialogOpen} onOpenChange={setIsManageDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Manage Sessions</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-muted-foreground">
                {sessions.length} {sessions.length === 1 ? 'session' : 'sessions'}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsNewSessionDialogOpen(true);
                  setIsManageDialogOpen(false);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                New Session
              </Button>
            </div>
            <ScrollArea className="h-[400px] pr-4">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={cn(
                    "flex items-center justify-between py-3 px-2 group hover:bg-muted/50 rounded-lg transition-colors",
                    currentSession.id === session.id && "bg-primary/5 hover:bg-primary/10"
                  )}
                >
                  <div className="flex-1 min-w-0 mr-4">
                    {editingSession?.id === session.id ? (
                      <Input
                        value={editingSession.name}
                        onChange={(e) => setEditingSession({ id: session.id, name: e.target.value })}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            onSessionRename(session.id, editingSession.name);
                            setEditingSession(null);
                          }
                          if (e.key === 'Escape') {
                            setEditingSession(null);
                          }
                        }}
                        onBlur={() => {
                          if (editingSession.name.trim()) {
                            onSessionRename(session.id, editingSession.name);
                          }
                          setEditingSession(null);
                        }}
                        autoFocus
                      />
                    ) : (
                      <div className="flex flex-col gap-1">
                        <div className="font-medium truncate">{session.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge 
                            variant="secondary" 
                            className="shrink-0 font-normal bg-muted/50 hover:bg-muted/70 border-0 text-muted-foreground"
                          >
                            {WCA_EVENTS.find(e => e.id === session.event)?.name}
                          </Badge>
                          <span>•</span>
                          <span>{session.times?.length || 0} solves</span>
                          <span>•</span>
                          <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        onSessionChange(session);
                        setIsManageDialogOpen(false);
                      }}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setEditingSession({ id: session.id, name: session.name })}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {session.id !== 'default' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteSession(session.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog 
        open={isDeleteConfirmOpen} 
        onOpenChange={(open) => {
          setIsDeleteConfirmOpen(open);
          if (!open) {
            setSessionToDelete(null);
            setIsManageDialogOpen(false);
            setIsDropdownOpen(false);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this session? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
