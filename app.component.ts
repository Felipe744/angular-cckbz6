/**
 * Sample for Hierarchical layout
 */

import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import {
  DiagramComponent,
  DiagramTools,
  PortVisibility,
  PointPortModel,
} from '@syncfusion/ej2-angular-diagrams';
import {
  Diagram,
  NodeModel,
  ConnectorModel,
  LayoutAnimation,
  DataBinding,
  HierarchicalTree,
  SnapConstraints,
  SnapSettingsModel,
  TextModel,
  LayoutOrientation,
} from '@syncfusion/ej2-diagrams';
import { ChangeEventArgs as CheckBoxChangeEventArgs } from '@syncfusion/ej2-buttons';
import { ChangeEventArgs as NumericChangeEventArgs } from '@syncfusion/ej2-inputs';
import { DataManager } from '@syncfusion/ej2-data';
import * as Data from './diagram-data.json';
Diagram.Inject(DataBinding, HierarchicalTree, LayoutAnimation);

export interface EmployeeInfo {
  Name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild('diagram')
  public diagram: DiagramComponent;

  public ports: PointPortModel[] = [
    {
      id: 'port1',
      offset: {
        x: 0,
        y: 0.5,
      },
      visibility: PortVisibility.Visible,
    },
    {
      id: 'port2',
      offset: {
        x: 1,
        y: 0.5,
      },
      visibility: PortVisibility.Visible,
    },
    {
      id: 'port3',
      offset: {
        x: 0.5,
        y: 0,
      },
      visibility: PortVisibility.Visible,
    },
    {
      id: 'port4',
      offset: {
        x: 0.5,
        y: 1,
      },
      visibility: PortVisibility.Visible,
    },
  ];

  public data: Object = {
    //sets the fields to bind
    id: 'id',
    parentId: 'parentId',
    dataSource: new DataManager(this.getTree()),
    //binds the data with the nodes
    doBinding: (nodeModel: NodeModel, data: object, diagram: Diagram) => {
      nodeModel.shape = { type: 'HTML', content: this.createCard('id', data) };
    },
  };

  public snapSettings: SnapSettingsModel = {
    constraints: SnapConstraints.None,
  };

  tool: DiagramTools = DiagramTools.ZoomPan;

  public layout: Object = {
    type: 'HierarchicalTree',
    verticalSpacing: 250,
    horizontalSpacing: 500,
    enableAnimation: true,
  };

  //Defines the default node and connector properties
  public nodeDefaults(obj: NodeModel): NodeModel {
    obj.ports = [
      {
        id: 'port1',
        offset: {
          x: 10,
          y: 10,
        },
        visibility: PortVisibility.Visible,
      },
      {
        id: 'port2',
        offset: {
          x: 10,
          y: 1,
        },
        visibility: PortVisibility.Visible,
      },
    ];
    return obj;
  }

  public connDefaults(
    connector: ConnectorModel,
    diagram: Diagram
  ): ConnectorModel {
    connector.targetDecorator.shape = 'None';
    connector.type = 'Orthogonal';
    connector.constraints = 0;
    connector.cornerRadius = 5;
    connector.style.strokeColor = '#6d6d6d';
    connector.sourcePortID = 'port1';
    connector.targetPortID = 'port2';
    connector.segments = [
      { type: 'Orthogonal', length: 5, direction: 'Right' },
    ];
    return connector;
  }

  public created(args: Object): void {
    this.diagram.connectors.forEach((con) => {
      con.segments = [{ type: 'Orthogonal', length: 5, direction: 'Right' }];
    });
  }
  ngOnInit(): void {
    document.getElementById('appearance').onclick =
      this.documentClick.bind(this);
  }

  public documentClick(args: MouseEvent): void {
    let target: HTMLElement = args.target as HTMLElement;
    // custom code start
    let selectedElement: HTMLCollection =
      document.getElementsByClassName('e-selected-style');
    if (selectedElement.length) {
      selectedElement[0].classList.remove('e-selected-style');
    }
    // custom code end
    if (target.className === 'image-pattern-style') {
      let id: string = target.id;
      let orientation1: string =
        id.substring(0, 1).toUpperCase() + id.substring(1, id.length);
      this.diagram.layout.orientation = orientation1 as LayoutOrientation;
      this.diagram.layout.orientation = orientation1 as LayoutOrientation;
      this.diagram.doLayout();
      // custom code start
      target.classList.add('e-selected-style');
      // custom code end
      this.diagram.dataBind();
    }
  }

  onhSpacingChange(args: NumericChangeEventArgs): void {
    this.diagram.layout.horizontalSpacing = Number(args.value);
    this.diagram.dataBind();
  }

  onvSpacingChange(args: NumericChangeEventArgs): void {
    this.diagram.layout.verticalSpacing = Number(args.value);
    this.diagram.dataBind();
  }

  onExpandChange(args: CheckBoxChangeEventArgs): void {
    for (let node of this.diagram.nodes) {
      if (args.checked) {
        node.expandIcon.shape = 'Minus';
        node.collapseIcon.shape = 'Plus';
      } else {
        node.expandIcon.shape = 'None';
        node.collapseIcon.shape = 'None';
      }
    }
    this.diagram.dataBind();
    this.diagram.doLayout();
  }

  getTree(): treeDiagram[] {
    let data: treeDiagram[] = [
      {
        id: 'primeiro',
        parentId: '',
        level: 1,
      },
      {
        id: 'segundo',
        parentId: 'primeiro',
        level: 2,
      },
      {
        id: 'terceiro',
        parentId: 'primeiro',
        level: 2,
      },
      {
        id: 'treze',
        parentId: 'segundo',
        level: 3,
      },
      {
        id: 'quatorze',
        parentId: 'segundo',
        level: 3,
      },
      {
        id: 'quarto',
        parentId: 'segundo',
        level: 3,
      },
      {
        id: 'quinto',
        parentId: 'terceiro',
        level: 3,
      },
      {
        id: 'sexto',
        parentId: 'terceiro',
        level: 3,
      },
      {
        id: 'setimo',
        parentId: 'segundo',
        level: 3,
      },
      {
        id: 'oitavo',
        parentId: 'quinto',
        level: 4,
      },
      {
        id: 'nono',
        parentId: 'quinto',
        level: 4,
      },
      {
        id: 'decimo',
        parentId: 'quinto',
        level: 4,
      },
      {
        id: 'onze',
        parentId: 'sexto',
        level: 4,
      },
      {
        id: 'doze',
        parentId: 'sexto',
        level: 4,
      },
    ];

    return data;
  }

  createCard(id: string, data: any): string {
    const class1 = 'color: red;';
    const class2 = `width:400px; height:150px; -webkit-tap-highlight-color: rgba(0,0,0,0); background-color: #fff; 
              border: 1px none #000;  box-shadow: 0 2px 3px 0 rgb(0 0 0 / 16%); color: rgba(0,0,0,.87); outline: none;`;

    let card: string =
      `<div style="` +
      class2 +
      `"><h1 style="` +
      class1 +
      `">` +
      data.id +
      `</h1>
              <p>This is a paragraph.</p><div id='teste' style="width: 30px; height:30px"></div></div>`;

    return card;
  }
}

interface treeDiagram {
  id: string;
  parentId: string;
  level: number;
}
