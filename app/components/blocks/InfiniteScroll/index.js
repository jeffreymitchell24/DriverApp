import React, { Component } from 'react'
import { FlatList } from 'react-native'
import PropTypes from 'prop-types'

export default class InfiniteScroll extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.data,
      end: true
    }
    this.length = this.state.data.length
    this.data = [...this.props.data]
    this.skipCheck = false
    this.offset = 0
  }

  getDirection = (contentOffsetY, offset = 0) => {
    return contentOffsetY > offset ? 'down' : 'up'
  }

  checkScroll({ layoutMeasurement, contentOffset, contentSize }) {
    if (!this.skipCheck) {
      let currentOffset = contentOffset.y
      let direction = this.getDirection(currentOffset, this.offset)

      this.offset = currentOffset
      if (contentOffset.y <= this.props.offset && direction === 'up') {
        this.skipCheck = true

        this.setState(
          prevState => ({
            data: [...this.data, ...this.data]
          }),
          () => {
            this.infListRef.scrollToIndex({
              index: this.length,
              animated: false
            })

            this.skipCheck = false
          }
        )
      } else {
        this.skipCheck = false
      }
    }
  }

  onEndReached = info => {
    if (this.state.data.length > this.length * 2) {
      this.setState(prevState => {
        return {
          data: prevState.data.slice(this.length * 2)
        }
      })
    } else {
      this.setState(prevState => {
        return {
          data: [...prevState.data, ...this.data]
        }
      })
    }
  }

  render() {
    return (
      <FlatList
        {...this.props}
        data={this.state.data}
        ref={ref => {
          this.infListRef = ref
        }}
        renderItem={this.props.renderItem}
        showsVerticalScrollIndicator={this.props.showsVerticalScrollIndicator}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.1}
        onScroll={({ nativeEvent }) => this.checkScroll(nativeEvent)}
      />
    )
  }
}

InfiniteScroll.propTypes = {
  data: PropTypes.array,
  offset: PropTypes.number,
  renderItem: PropTypes.func,
  showsVerticalScrollIndicator: PropTypes.bool
}

InfiniteScroll.defaultProps = {
  offset: 20,
  showsVerticalScrollIndicator: false
}
