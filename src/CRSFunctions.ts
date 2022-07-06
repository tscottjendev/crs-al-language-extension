import * as vscode from 'vscode';
import { Settings } from './Settings';
import { DynamicsNAV } from './DynamicsNAV';
import { WorkspaceFiles } from './WorkspaceFiles';
import { SnippetFunctions } from './SnippetFunctions';
import * as fs from 'fs';
import { NAVObject } from './NAVObject';
import * as path from 'path'
import { MSDocs } from './MSDocs';
import { Google } from './Google';
import * as CRSStatusBar from './UI/CRSStatusBar';
import * as Configuration from './Configuration';
import { ALCExe } from './ALCExe';
import { AppInsights, EventName } from './ApplicationInsights';

export function InstallWaldosModules() {
    console.log('Running: InstallWaldosModules');

    vscode.window.showErrorMessage('This function has been temporarily disabled');

    console.log('Done: InstallWaldosModules');
}

export async function CreateGraphVizDependencyGraph() {
    console.log('Running: CreateGraphVizDependencyGraph');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.CreateGraphVizDependencyGraph, appInsightsEntryProperties);

    await WorkspaceFiles.CreateGraphVizDependencyGraph();

    console.log('Done: CreateGraphVizDependencyGraph');
}

export async function CompileDGML() {
    console.log('Running: CompileDGML');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.CompileDGML, appInsightsEntryProperties);


    ALCExe.CompileDGML();

    console.log('Done: CompileDGML');
}

export function RunCurrentObjectWeb(currFile: vscode.Uri) {
    console.log('Running: RunCurrentObjectWeb');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunCurrentObjectWeb, appInsightsEntryProperties);

    let currentdocument = currFile;

    if (!currentdocument) {
        currentdocument = vscode.window.activeTextEditor.document.uri
    }
    let navObject = new NAVObject(fs.readFileSync(currentdocument.fsPath).toString(), Settings.GetConfigSettings(currentdocument), path.basename(currentdocument.fsPath));

    let objectId = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.extendedObjectId : navObject.objectId;
    let objectType = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.objectType.toLowerCase().replace('extension', '') : navObject.objectType
    if (objectId) {
        DynamicsNAV.RunObjectInWebClient(objectType, objectId, 'WebClient');
    }

    console.log('Done: RunCurrentObjectWeb')
}

export async function PublishAndRunCurrentObjectWeb(currFile: vscode.Uri) {
    console.log('Running: PublishAndRunCurrentObjectWeb');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.PublishAndRunCurrentObjectWeb, appInsightsEntryProperties);

    let currentdocument = currFile;

    if (!currentdocument) {
        currentdocument = vscode.window.activeTextEditor.document.uri
    }
    let navObject = new NAVObject(fs.readFileSync(currentdocument.fsPath).toString(), Settings.GetConfigSettings(currentdocument), path.basename(currentdocument.fsPath));

    let objectId = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.extendedObjectId : navObject.objectId;
    let objectType = navObject.objectType.toLowerCase().endsWith('extension') ? navObject.objectType.toLowerCase().replace('extension', '') : navObject.objectType
    if (objectId) {
        await vscode.commands.executeCommand('al.publishNoDebug');
        DynamicsNAV.RunObjectInWebClient(objectType, objectId, 'WebClient');
    }

    console.log('Done: PublishAndRunCurrentObjectWeb')
}

export function RunObjectWeb() {
    console.log('Running: RunObjectWeb');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunObjectWeb, appInsightsEntryProperties);

    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'WebClient')));

    console.log('Done: RunObjectWeb')
}
export function RunTestTool() {
    console.log('Running: RunTestTool');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunTestTool, appInsightsEntryProperties);


    DynamicsNAV.RunObjectInWebClient('Page', 130451, 'WebClient');

    console.log('Done: RunTestTool')
}

export function RunEventSubscribers() {
    console.log('Running: RunEventSubscribers');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunEventSubscribers, appInsightsEntryProperties);


    DynamicsNAV.RunObjectInWebClient('Page', 9510, 'WebClient');

    console.log('Done: RunEventSubscribers')
}

export function RunDatabaseLocks() {
    console.log('Running: RunDatabaseLocks');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunDatabaseLocks, appInsightsEntryProperties);


    DynamicsNAV.RunObjectInWebClient('Page', 9511, 'WebClient');

    console.log('Done: RunDatabaseLocks')
}

export function RunObjectTablet() {
    console.log('Running: RunObjectTablet');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunObjectTablet, appInsightsEntryProperties);


    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Tablet')));

    console.log('Done: RunObjectTablet')
}

export function RunObjectPhone() {
    console.log('Running: RunObjectPhone');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunObjectPhone, appInsightsEntryProperties);


    vscode.window.showQuickPick(DynamicsNAV.GetRunWebObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWebClient(objecttype, objectid, 'Phone')));

    console.log('Done: RunObjectPhone')
}

export function RunObjectWindows() {
    console.log('Running: RunObjectWindows');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RunObjectWindows, appInsightsEntryProperties);


    vscode.window.showQuickPick(DynamicsNAV.GetRunRTCObjectTypesAsQuickPickItem()).then(objecttype =>
        vscode.window.showInputBox({ prompt: 'ObjectID:' }).then(objectid =>
            DynamicsNAV.RunObjectInWindowsClient(objecttype, objectid)));

    console.log('Done: RunObjectWindows')
}

export function RenameCurrentFile() {
    console.log('Running: RenameCurrentFile');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RenameCurrentFile, appInsightsEntryProperties);


    vscode.window.activeTextEditor.document.save().then(saved => {
        let oldFilename = vscode.window.activeTextEditor.document
        let newFileName = WorkspaceFiles.RenameFile(oldFilename.uri);

        if (oldFilename.uri.fsPath != newFileName) {
            WorkspaceFiles.openRenamedFile(newFileName);
        }
    })
    console.log('Done: RenameCurrentFile')
}

export function RenameAllFiles() {
    console.log('Running: RenameAllFiles');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.RenameAllFiles, appInsightsEntryProperties);


    let mySettings = Settings.GetConfigSettings(null);
    let SkipWarningMessageOnRenameAll = mySettings[Settings.SkipWarningMessageOnRenameAll];

    if (!SkipWarningMessageOnRenameAll) {
        vscode.window.showWarningMessage('Are you sure to rename all files from all opened workspaces?', 'Yes', 'No').then((action: String) => {
            if (action === 'Yes') {
                WorkspaceFiles.RenameAllFiles();
                vscode.commands.executeCommand('workbench.action.closeAllEditors');
            }
        });
    }
    else {
        WorkspaceFiles.RenameAllFiles();
        vscode.commands.executeCommand('workbench.action.closeAllEditors');
    }

    console.log('Done: RenameAllFiles')
}

export function ReorganizeCurrentFile() {
    console.log('Running: ReorganizeCurrentFile');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.ReorganizeCurrentFile, appInsightsEntryProperties);


    vscode.window.activeTextEditor.document.save().then(saved => {
        let newFileName = WorkspaceFiles.ReorganizeFile(vscode.window.activeTextEditor.document.uri);
        vscode.workspace.openTextDocument(newFileName).then(doc => vscode.window.showTextDocument(doc));
    })
    console.log('Done: ReorganizeCurrentFile')
}

export function ReorganizeAllFiles() {
    console.log('Running: ReorganizeAllFiles');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.ReorganizeAllFiles, appInsightsEntryProperties);


    vscode.window.showWarningMessage('Are you sure to reorganize all files from all opened workspaces?', 'Yes', 'No').then((action: String) => {
        if (action === 'Yes') {
            WorkspaceFiles.ReorganizeAllFiles();
            vscode.commands.executeCommand('workbench.action.closeAllEditors');
        }
    });

    console.log('Done: ReorganizeAllFiles')
}

export function SearchMicrosoftDocs() {
    console.log('Running: SearchMicrosoftDocs');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.SearchMicrosoftDocs, appInsightsEntryProperties);


    let currentword = vscode.window.activeTextEditor ? getWord(vscode.window.activeTextEditor) : "";
    vscode.window.showInputBox({ value: currentword, prompt: "Search String:" }).then(SearchString =>
        MSDocs.OpenSearchUrl(SearchString));

    console.log('Done: SearchMicrosoftDocs');
}

export function SearchGoogle() {
    console.log('Running: SearchGoogle');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.SearchGoogle, appInsightsEntryProperties);


    let currentword = vscode.window.activeTextEditor ? getWord(vscode.window.activeTextEditor) : "";
    vscode.window.showInputBox({ value: currentword, prompt: "Search String:" }).then(SearchString =>
        Google.OpenSearchUrl(SearchString));

    console.log('Done: SearchGoogle');
}

export function SearchObjectNames() {
    console.log('Running: SearchObjectNames');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.SearchObjectNames, appInsightsEntryProperties);


    let currentword = vscode.window.activeTextEditor ? getWord(vscode.window.activeTextEditor) : "";
    vscode.window.showInputBox({ value: currentword, prompt: "Search String:" }).then(SearchString =>
        DynamicsNAV.SearchObjectNames(SearchString));

    console.log('Done: SearchObjectNames');
}

export function SetupSnippets() {
    console.log('Running: SetupSnippets');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.SetupSnippets, appInsightsEntryProperties);


    SnippetFunctions.SetupDefaultAlSnippets();
    SnippetFunctions.SetupCRSAlSnippets();

    console.log('Done: SetupSnippets');
}

export function HandleOnSaveTextDocument() {
    console.log('Running: HandleOnSaveTextDocument');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.HandleOnSaveTextDocument, appInsightsEntryProperties);


    WorkspaceFiles.renameFileOnSave();

    console.log('Done: HandleOnSaveTextDocument');
}

/*** changed to onDidChangeActiveTextEditor eventhandler
 * @deprecated
 */
export function HandleOnOpenTextDocument() {
    console.log('Running: HandleOnOpenTextDocument');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.HandleOnOpenTextDocument, appInsightsEntryProperties);


    CRSStatusBar.toggleRunObjectFromStatusBar();

    console.log('Done: HandleOnOpenTextDocument')
}

export function HandleOnChangeActiveTextEditor(editor?: vscode.TextEditor) {
    console.log('Running: HandleOnChangeActiveTextEditor');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.HandleOnChangeActiveTextEditor, appInsightsEntryProperties);


    CRSStatusBar.toggleRunObjectFromStatusBar(editor?.document);

    console.log('Done: HandleOnChangeActiveTextEditor')
}

export function ConfigureBestPracticeNaming() {
    console.log('Running: ConfigureBestPracticeNaming');

    let appInsightsEntryProperties: any = {};
    AppInsights.getInstance().trackEvent(EventName.ConfigureBestPracticeNaming, appInsightsEntryProperties);


    Configuration.configureBestPracticesNaming();

    console.log('Done: ConfigureBestPracticeNaming')
}



function getWord(editor: vscode.TextEditor): string {
    const selection = editor.selection;
    const doc = editor.document;
    if (selection.isEmpty) {
        const cursorWordRange = doc.getWordRangeAtPosition(selection.active);

        if (cursorWordRange) {
            let newSe = new vscode.Selection(cursorWordRange.start.line, cursorWordRange.start.character, cursorWordRange.end.line, cursorWordRange.end.character);
            editor.selection = newSe;
            return editor.document.getText(editor.selection);

        } else {
            return '';
        }
    } else {
        return editor.document.getText(editor.selection);
    }
}