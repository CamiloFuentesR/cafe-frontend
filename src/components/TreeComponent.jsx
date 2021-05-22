import React from 'react'
import Tree from 'react-animated-tree'

export const TreeComponent = () => {
    const config = open => ({
        from: { height: 0, opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: {
            height: open ? 'auto' : 0,
            opacity: open ? 1 : 0,
            transform: open ? 'translate3d(0px,0px,0)' : 'translate3d(20px,0,0)',
            icons: 'eye'
        },
    })

    const SpecialTree = props => <Tree {...props} springConfig={config}  />
    return (

        <table className="table table-bordered table-stripped">
            <thead>
                <tr>
                    <th>name</th>
                    <th>apellido</th>
                    <th>edad</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td >
                        <SpecialTree content="Orange" canHide={true}>
                            <SpecialTree content="Juice" />
                        </SpecialTree>
                    </td>
                    <td>Fuentes</td>
                    <td>12</td>
                </tr>

            </tbody>
        </table>

    )
}
